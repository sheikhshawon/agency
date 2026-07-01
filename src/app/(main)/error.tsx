"use client";

import Link from "next/link";

// Route-level error boundary for the public site. Keeps the shell (navbar/
// footer from the layout) and shows a friendly recovery UI.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-6 text-center pt-32 pb-24">
      <div className="w-14 h-14 rounded-2xl bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 flex items-center justify-center text-2xl">
        ⚠️
      </div>
      <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
      <p className="text-sm text-[#A0A0A0] max-w-md">
        We hit an unexpected error loading this page. You can try again or head back home.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-[#1B6BFF] hover:bg-[#1557CC] text-white text-sm font-semibold transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-[#0F0F0F] border border-[#1E1E1E] text-[#A0A0A0] hover:text-white text-sm font-medium transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
