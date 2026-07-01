import type { SeriesPoint } from "@/lib/analytics";

/**
 * Lightweight, dependency-free SVG chart for the admin analytics page.
 * Renders Page Views as a gradient area and Users as a line over the period.
 * Pure/server-renderable — no client JS.
 */

const VIEW_W = 760;
const VIEW_H = 260;
const PAD = { top: 16, right: 16, bottom: 28, left: 40 };

const INNER_W = VIEW_W - PAD.left - PAD.right;
const INNER_H = VIEW_H - PAD.top - PAD.bottom;

const compact = (n: number) =>
  Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

/** Round a value up to a clean axis maximum (1, 2, 2.5, 5, 10 × 10ⁿ). */
function niceCeil(v: number): number {
  if (v <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / pow;
  const nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nf * pow;
}

export default function AnalyticsChart({ series }: { series: SeriesPoint[] }) {
  const n = series.length;
  const maxRaw = Math.max(1, ...series.map((p) => Math.max(p.pageViews, p.users)));
  const max = niceCeil(maxRaw);

  const x = (i: number) => PAD.left + (n <= 1 ? 0 : (i / (n - 1)) * INNER_W);
  const y = (v: number) => PAD.top + INNER_H - (v / max) * INNER_H;

  const linePath = (key: "pageViews" | "users") =>
    series.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join(" ");

  const viewsLine = linePath("pageViews");
  const areaPath =
    n > 0
      ? `${viewsLine} L${x(n - 1).toFixed(1)},${(PAD.top + INNER_H).toFixed(1)} L${x(0).toFixed(
          1
        )},${(PAD.top + INNER_H).toFixed(1)} Z`
      : "";

  // 5 horizontal gridlines (0 … max).
  const gridLevels = [0, 0.25, 0.5, 0.75, 1];
  // ~7 evenly spaced x labels.
  const labelEvery = Math.max(1, Math.ceil(n / 7));

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className="w-full h-[260px]"
      role="img"
      aria-label="Page views and users over the selected period"
    >
      <defs>
        <linearGradient id="ga-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B6BFF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1B6BFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Gridlines + y labels */}
      {gridLevels.map((g) => {
        const gy = PAD.top + INNER_H - g * INNER_H;
        return (
          <g key={g}>
            <line
              x1={PAD.left}
              y1={gy}
              x2={VIEW_W - PAD.right}
              y2={gy}
              stroke="#EEF1F6"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={gy + 3}
              textAnchor="end"
              fontSize={10}
              fill="#9CA3AF"
            >
              {compact(Math.round(g * max))}
            </text>
          </g>
        );
      })}

      {/* x labels */}
      {series.map((p, i) =>
        i % labelEvery === 0 || i === n - 1 ? (
          <text
            key={p.date}
            x={x(i)}
            y={VIEW_H - 8}
            textAnchor="middle"
            fontSize={10}
            fill="#9CA3AF"
          >
            {p.label}
          </text>
        ) : null
      )}

      {/* Page views — area + line */}
      {areaPath && <path d={areaPath} fill="url(#ga-area)" />}
      <path d={viewsLine} fill="none" stroke="#1B6BFF" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

      {/* Users — secondary line */}
      <path
        d={linePath("users")}
        fill="none"
        stroke="#94A3B8"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Last page-views point marker */}
      {n > 0 && (
        <circle cx={x(n - 1)} cy={y(series[n - 1].pageViews)} r={3.5} fill="#1B6BFF" stroke="#fff" strokeWidth={1.5} />
      )}
    </svg>
  );
}
