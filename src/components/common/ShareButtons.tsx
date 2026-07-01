"use client";

import { useEffect, useState } from "react";
import { Link2, Check } from "lucide-react";

/**
 * Social share bar for public article / case-study pages.
 * Reads the live page URL in the browser (no base-URL env needed) and opens
 * each network's share dialog in a popup. Includes a copy-link fallback.
 */

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FBIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}
function LIIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ShareButtons({
  title,
  label = "Share",
}: {
  title: string;
  label?: string;
}) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FBIcon },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, Icon: XIcon },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LIIcon },
  ];

  const openShare = (href: string) => {
    if (!url) return;
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=560");
  };

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium text-[#808080]">{label}</span>
      <div className="flex items-center gap-2">
        {links.map(({ label, href, Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => openShare(href)}
            aria-label={`Share on ${label}`}
            title={`Share on ${label}`}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0F0F0F] border border-[#1E1E1E] text-[#A0A0A0] hover:text-white hover:border-[#1B6BFF]/40 hover:bg-[#1B6BFF]/10 transition-colors"
          >
            <Icon />
          </button>
        ))}
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          title={copied ? "Link copied" : "Copy link"}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0F0F0F] border border-[#1E1E1E] text-[#A0A0A0] hover:text-white hover:border-[#1B6BFF]/40 hover:bg-[#1B6BFF]/10 transition-colors"
        >
          {copied ? <Check size={15} className="text-green-400" /> : <Link2 size={15} />}
        </button>
      </div>
    </div>
  );
}
