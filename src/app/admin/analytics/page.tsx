import {
  Activity, Users, Eye, MousePointerClick, Globe2,
  ExternalLink, Clock, AlertCircle, KeyRound, RefreshCw,
} from "lucide-react";
import { getAnalyticsOverview, type AnalyticsOverview } from "@/lib/analytics";
import AnalyticsChart from "@/components/admin/AnalyticsChart";

export const dynamic = "force-dynamic";

const fmt = (n: number) => n.toLocaleString("en-US");
function fmtDuration(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

export default async function AnalyticsPage() {
  const state = await getAnalyticsOverview();
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Analytics</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {state.status === "ok"
              ? `Live traffic from Google Analytics · Last ${state.data.rangeDays} days`
              : "Live traffic from Google Analytics"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {measurementId && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E8ECF4] text-xs font-medium text-[#6B7280] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {measurementId}
            </span>
          )}
          <a
            href="https://analytics.google.com/analytics/web/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8ECF4] text-[#374151] text-sm font-medium rounded-xl hover:bg-[#F4F6FB] transition-colors shadow-sm"
          >
            <ExternalLink size={15} />
            Open in Google Analytics
          </a>
        </div>
      </div>

      {state.status === "unconfigured" && <SetupGuide />}
      {state.status === "error" && <ErrorCard message={state.message} />}
      {state.status === "ok" && <Overview data={state.data} />}
    </div>
  );
}

// ── OK state ─────────────────────────────────────────────────────────────────

function Overview({ data }: { data: AnalyticsOverview }) {
  const { kpis, series, topPages, topCountries } = data;
  const hasTraffic = series.some((p) => p.pageViews > 0 || p.users > 0) || kpis.pageViews > 0;
  const maxPageViews = Math.max(1, ...topPages.map((p) => p.views));
  const maxCountry = Math.max(1, ...topCountries.map((c) => c.users));

  return (
    <>
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi
          label="Active Right Now"
          value={fmt(kpis.activeNow)}
          hint="users in the last 30 min"
          icon={<Activity size={20} className="text-green-600" />}
          iconBg="bg-green-50"
          live
        />
        <Kpi
          label="Users"
          value={fmt(kpis.users)}
          hint={`last ${data.rangeDays} days`}
          icon={<Users size={20} className="text-[#1B6BFF]" />}
          iconBg="bg-blue-50"
        />
        <Kpi
          label="Page Views"
          value={fmt(kpis.pageViews)}
          hint={`avg session ${fmtDuration(kpis.avgSessionDuration)}`}
          icon={<Eye size={20} className="text-purple-500" />}
          iconBg="bg-purple-50"
        />
        <Kpi
          label="Sessions"
          value={fmt(kpis.sessions)}
          hint={`last ${data.rangeDays} days`}
          icon={<MousePointerClick size={20} className="text-amber-500" />}
          iconBg="bg-amber-50"
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F3F8] flex-wrap gap-3">
          <div>
            <p className="text-sm font-bold text-[#111827]">Traffic Overview</p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Daily page views and users</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-[3px] rounded-full bg-[#1B6BFF]" /> Page Views
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0 border-t-2 border-dashed border-[#94A3B8]" /> Users
            </span>
          </div>
        </div>
        <div className="px-3 py-4">
          {hasTraffic ? (
            <AnalyticsChart series={series} />
          ) : (
            <div className="h-[260px] flex flex-col items-center justify-center gap-2 text-center">
              <Activity size={22} className="text-[#9CA3AF]" />
              <p className="text-sm font-medium text-[#374151]">No traffic recorded yet</p>
              <p className="text-xs text-[#9CA3AF] max-w-xs">
                Once visitors arrive, data appears here. New properties can take up to 24–48h to
                populate non-realtime reports.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Top pages + countries */}
      <div className="grid lg:grid-cols-2 gap-5">
        <ListCard title="Top Pages" subtitle="Most viewed in the period" empty={topPages.length === 0}>
          {topPages.map((p) => (
            <BarRow key={p.path} label={p.path} value={fmt(p.views)} pct={(p.views / maxPageViews) * 100} bar="bg-[#1B6BFF]" />
          ))}
        </ListCard>

        <ListCard title="Top Countries" subtitle="Where your users are" empty={topCountries.length === 0} icon={<Globe2 size={16} className="text-[#1B6BFF]" />}>
          {topCountries.map((c) => (
            <BarRow key={c.country} label={c.country} value={fmt(c.users)} pct={(c.users / maxCountry) * 100} bar="bg-purple-500" />
          ))}
        </ListCard>
      </div>
    </>
  );
}

function Kpi({
  label, value, hint, icon, iconBg, live,
}: {
  label: string; value: string; hint: string;
  icon: React.ReactNode; iconBg: string; live?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>{icon}</div>
        {live && (
          <span className="flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-lg bg-green-50 text-green-600">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-green-500" />
            </span>
            Live
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-[#111827]">{value}</p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">{label}</p>
      </div>
      <p className="text-[11px] text-[#D1D5DB] border-t border-[#F1F3F8] pt-3 flex items-center gap-1">
        {label === "Page Views" && <Clock size={11} className="text-[#D1D5DB]" />}
        {hint}
      </p>
    </div>
  );
}

function ListCard({
  title, subtitle, empty, icon, children,
}: {
  title: string; subtitle: string; empty: boolean;
  icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-[#F1F3F8]">
        {icon}
        <div>
          <p className="text-sm font-bold text-[#111827]">{title}</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="px-6 py-4 flex flex-col gap-3.5">
        {empty ? <p className="text-xs text-[#9CA3AF] text-center py-6">No data yet</p> : children}
      </div>
    </div>
  );
}

function BarRow({ label, value, pct, bar }: { label: string; value: string; pct: number; bar: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 gap-3">
        <span className="text-xs font-medium text-[#374151] truncate" title={label}>{label}</span>
        <span className="text-xs font-bold text-[#111827] shrink-0 tabular-nums">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-[#F1F3F8] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${Math.max(2, pct)}%` }} />
      </div>
    </div>
  );
}

// ── Unconfigured / error states ──────────────────────────────────────────────

function SetupGuide() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#F1F3F8]">
        <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
          <KeyRound size={16} className="text-[#1B6BFF]" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#111827]">Connect the Google Analytics Data API</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">A one-time setup to pull live stats into this dashboard</p>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 text-sm text-[#374151]">
        <ol className="flex flex-col gap-3 list-decimal pl-5 marker:text-[#9CA3AF] marker:font-semibold">
          <li>In <b>Google Cloud Console</b>, create (or pick) a project and enable the <b>Google Analytics Data API</b>.</li>
          <li>Create a <b>Service Account</b>, then add a <b>JSON key</b> and download it.</li>
          <li>In <b>GA4 → Admin → Property Access Management</b>, add the service-account email as a <b>Viewer</b>.</li>
          <li>Find your numeric <b>Property ID</b> in <b>GA4 → Admin → Property Settings</b>.</li>
          <li>Add these to <code className="px-1.5 py-0.5 rounded bg-[#F4F6FB] border border-[#E8ECF4] text-[12px]">.env.local</code> (and your host&apos;s env), then restart:</li>
        </ol>
        <pre className="text-[12px] leading-relaxed bg-[#0C0D2E] text-[#D7DCEC] rounded-xl p-4 overflow-x-auto">
{`GA4_PROPERTY_ID=123456789
GOOGLE_CLIENT_EMAIL=name@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n…\\n-----END PRIVATE KEY-----\\n"`}
        </pre>
        <p className="text-xs text-[#9CA3AF] flex items-center gap-1.5">
          <RefreshCw size={12} /> This page reads those server-side secrets; they are never exposed to the browser.
        </p>
      </div>
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-red-50 bg-red-50/40">
        <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
          <AlertCircle size={16} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#111827]">Couldn&apos;t load analytics</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">Google Analytics rejected the request</p>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-3 text-sm text-[#374151]">
        <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 font-mono break-words">
          {message}
        </p>
        <ul className="text-xs text-[#6B7280] list-disc pl-5 flex flex-col gap-1.5">
          <li>Confirm <code className="px-1 rounded bg-[#F4F6FB]">GA4_PROPERTY_ID</code> is the numeric property ID (not the G-XXXX measurement ID).</li>
          <li>Make sure the service-account email is added as a <b>Viewer</b> on the GA property.</li>
          <li>Check the <b>Google Analytics Data API</b> is enabled for the Cloud project.</li>
          <li>Verify <code className="px-1 rounded bg-[#F4F6FB]">GOOGLE_PRIVATE_KEY</code> kept its <code className="px-1 rounded bg-[#F4F6FB]">\n</code> escapes and quotes.</li>
        </ul>
      </div>
    </div>
  );
}
