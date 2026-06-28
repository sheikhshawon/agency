"use client";

/* Figma Group 39473 — scrolling partner/tech logos strip with gradient bg */

const ITEMS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "AWS", "Google Cloud", "MongoDB", "PostgreSQL", "Docker",
  "Figma", "Tailwind CSS", "GraphQL", "Redis", "Kubernetes",
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "AWS", "Google Cloud", "MongoDB", "PostgreSQL", "Docker",
  "Figma", "Tailwind CSS", "GraphQL", "Redis", "Kubernetes",
];

export default function MarqueeSection() {
  return (
    <section className="relative py-10 overflow-hidden">
      {/* Gradient background strip — same navy→indigo→navy as Figma */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #04051B 0%, rgba(42,37,148,0.4) 50%, #04051B 100%)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      />

      {/* Left + right fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, #04051B, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(-90deg, #04051B, transparent)",
        }}
      />

      {/* Scrolling track */}
      <div className="relative z-0 flex overflow-hidden">
        <div
          className="flex gap-12 items-center animate-marquee shrink-0 whitespace-nowrap"
          aria-hidden="true"
        >
          {ITEMS.map((name, i) => (
            <span
              key={i}
              className="text-[14px] font-medium text-white/35 hover:text-white/70 transition-colors cursor-default select-none"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
