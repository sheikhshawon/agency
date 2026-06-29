import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/session";

// Protects the entire /admin area. In Next.js 16 this file convention is
// "proxy" (formerly "middleware") and runs on the Node.js runtime.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  const isLoginPage = pathname === "/admin/login";

  // Already signed in → keep them out of the login page.
  if (isLoginPage) {
    if (session) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  // Not signed in → send to login, remembering where they were headed.
  if (!session) {
    const url = new URL("/admin/login", request.url);
    if (pathname !== "/admin") url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
