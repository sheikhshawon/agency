import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo variants:
 *  "light" — white/outline logo for dark backgrounds (navbar, dark sections, footer)
 *  "dark"  — black logo for light backgrounds
 *
 * showWordmark:
 *  true  (default) — icon + "enif IT" text wordmark
 *  false           — icon only (favicons, tight spaces)
 */
interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
  height?: number;
}

export default function Logo({
  className,
  variant = "light",
  showWordmark = true,
  height = 36,
}: LogoProps) {
  const isLight = variant === "light";

  if (showWordmark) {
    /* Use the full wordmark image — one clean asset, pixel-perfect brand */
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1560FF] rounded",
          className
        )}
        aria-label="Enif IT Services Ltd. — Home"
      >
        <Image
          src={
            isLight
              ? "/images/logo/enif-logo-light.png"
              : "/images/logo/enif-logo-dark.png"
          }
          alt="Enif IT Services Ltd."
          height={height}
          width={height * 4.2} /* approximate aspect ratio from the logo files */
          className="object-contain"
          priority
        />
      </Link>
    );
  }

  /* Icon-only (favicon) version */
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1560FF] rounded",
        className
      )}
      aria-label="Enif IT Services Ltd. — Home"
    >
      <Image
        src={
          isLight
            ? "/images/logo/enif-favicon-light.png"
            : "/images/logo/enif-favicon-dark.png"
        }
        alt="Enif IT"
        height={height}
        width={height}
        className="object-contain"
        priority
      />
    </Link>
  );
}
