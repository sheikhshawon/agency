// ─────────────────────────────────────────────────────────────────────────
// Google Analytics 4 — Data API access layer (server-only).
//
// Reads live stats for the admin dashboard. Authenticates with a Google Cloud
// service account (JWT → OAuth access token) and queries the GA4 Data API over
// REST, so there is no gRPC dependency to bundle.
//
// Required server-only env vars (see .env.local):
//   GA4_PROPERTY_ID      numeric GA4 property id (NOT the G-XXXX measurement id)
//   GOOGLE_CLIENT_EMAIL  service-account email
//   GOOGLE_PRIVATE_KEY   service-account private key (\n-escaped, quoted)
// ─────────────────────────────────────────────────────────────────────────

import { JWT } from "google-auth-library";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const DATA_API = "https://analyticsdata.googleapis.com/v1beta";
const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];
const RANGE_DAYS = 28;

// ── Types ──────────────────────────────────────────────────────────────────

export type SeriesPoint = {
  date: string; // YYYYMMDD
  label: string; // "Jun 12"
  users: number;
  pageViews: number;
};

export type AnalyticsOverview = {
  rangeDays: number;
  kpis: {
    activeNow: number; // realtime active users (last 30 min)
    users: number;
    pageViews: number;
    sessions: number;
    avgSessionDuration: number; // seconds
  };
  series: SeriesPoint[];
  topPages: { path: string; views: number }[];
  topCountries: { country: string; users: number }[];
};

export type AnalyticsState =
  | { status: "unconfigured" }
  | { status: "error"; message: string }
  | { status: "ok"; data: AnalyticsOverview };

export function isAnalyticsConfigured(): boolean {
  return Boolean(PROPERTY_ID && CLIENT_EMAIL && PRIVATE_KEY);
}

// ── GA Data API plumbing ─────────────────────────────────────────────────────

type GaRow = {
  dimensionValues?: { value: string }[];
  metricValues?: { value: string }[];
};
type GaReport = { rows?: GaRow[] };

async function getAccessToken(): Promise<string> {
  // Private keys pasted into env files keep their newlines as literal "\n".
  const key = PRIVATE_KEY!.replace(/\\n/g, "\n");
  const jwt = new JWT({ email: CLIENT_EMAIL, key, scopes: SCOPES });
  const { token } = await jwt.getAccessToken();
  if (!token) throw new Error("Could not obtain a Google access token.");
  return token;
}

async function callDataApi(
  token: string,
  method: "batchRunReports" | "runRealtimeReport",
  body: unknown
): Promise<unknown> {
  const res = await fetch(`${DATA_API}/properties/${PROPERTY_ID}:${method}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const detail = text.replace(/\s+/g, " ").trim().slice(0, 300);
    throw new Error(`GA Data API (${method}) returned ${res.status}. ${detail}`);
  }
  return res.json();
}

// ── Row helpers ──────────────────────────────────────────────────────────────

const num = (v?: string) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

function ymd(d: Date): string {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function labelFromYmd(s: string): string {
  const y = Number(s.slice(0, 4));
  const m = Number(s.slice(4, 6)) - 1;
  const d = Number(s.slice(6, 8));
  return new Date(y, m, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Build a continuous YYYYMMDD range ending today so the chart has no gaps. */
function buildDateRange(days: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(ymd(d));
  }
  return out;
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function getAnalyticsOverview(): Promise<AnalyticsState> {
  if (!isAnalyticsConfigured()) return { status: "unconfigured" };

  const dateRanges = [{ startDate: `${RANGE_DAYS - 1}daysAgo`, endDate: "today" }];

  try {
    const token = await getAccessToken();

    const [batch, activeNow] = await Promise.all([
      callDataApi(token, "batchRunReports", {
        requests: [
          // 0 — period totals
          {
            dateRanges,
            metrics: [
              { name: "totalUsers" },
              { name: "screenPageViews" },
              { name: "sessions" },
              { name: "averageSessionDuration" },
            ],
          },
          // 1 — daily time series
          {
            dateRanges,
            dimensions: [{ name: "date" }],
            metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }],
            orderBys: [{ dimension: { dimensionName: "date" } }],
          },
          // 2 — top pages
          {
            dateRanges,
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }],
            orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
            limit: 8,
          },
          // 3 — top countries
          {
            dateRanges,
            dimensions: [{ name: "country" }],
            metrics: [{ name: "totalUsers" }],
            orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
            limit: 5,
          },
        ],
      }),
      // Realtime is best-effort: never let it fail the whole dashboard.
      getActiveUsers(token).catch(() => 0),
    ]);

    const reports = (batch as { reports?: GaReport[] }).reports ?? [];
    const [totalsR, seriesR, pagesR, countriesR] = reports;

    const totals = totalsR?.rows?.[0]?.metricValues ?? [];

    // Fill the series across the full range so missing days render as 0.
    const seriesMap = new Map<string, { users: number; pageViews: number }>();
    for (const row of seriesR?.rows ?? []) {
      const date = row.dimensionValues?.[0]?.value;
      if (!date) continue;
      seriesMap.set(date, {
        users: num(row.metricValues?.[0]?.value),
        pageViews: num(row.metricValues?.[1]?.value),
      });
    }
    const series: SeriesPoint[] = buildDateRange(RANGE_DAYS).map((date) => ({
      date,
      label: labelFromYmd(date),
      users: seriesMap.get(date)?.users ?? 0,
      pageViews: seriesMap.get(date)?.pageViews ?? 0,
    }));

    const topPages = (pagesR?.rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "/",
      views: num(row.metricValues?.[0]?.value),
    }));

    const topCountries = (countriesR?.rows ?? []).map((row) => ({
      country: row.dimensionValues?.[0]?.value || "Unknown",
      users: num(row.metricValues?.[0]?.value),
    }));

    return {
      status: "ok",
      data: {
        rangeDays: RANGE_DAYS,
        kpis: {
          activeNow,
          users: num(totals[0]?.value),
          pageViews: num(totals[1]?.value),
          sessions: num(totals[2]?.value),
          avgSessionDuration: num(totals[3]?.value),
        },
        series,
        topPages,
        topCountries,
      },
    };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Failed to load analytics.",
    };
  }
}

async function getActiveUsers(token: string): Promise<number> {
  const res = (await callDataApi(token, "runRealtimeReport", {
    metrics: [{ name: "activeUsers" }],
  })) as GaReport;
  return num(res.rows?.[0]?.metricValues?.[0]?.value);
}
