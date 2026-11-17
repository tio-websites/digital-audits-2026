import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

const CMS_SECRET = new TextEncoder().encode(
  process.env.CMS_JWT_SECRET ?? "cms-dev-secret-change-in-production"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── CMS routes ────────────────────────────────────────────────────────────
  if (pathname.startsWith("/cms") && !pathname.startsWith("/cms/login")) {
    const token = req.cookies.get("cms_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/cms/login", req.url));
    }
    try {
      await jwtVerify(token, CMS_SECRET);
    } catch {
      const res = NextResponse.redirect(new URL("/cms/login", req.url));
      res.cookies.delete("cms_session");
      return res;
    }
    return NextResponse.next();
  }

  // ── Platform / admin routes ───────────────────────────────────────────────
  const authToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isProtected = pathname.startsWith("/platform") || pathname.startsWith("/admin");
  if (isProtected && !authToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && authToken?.role !== "admin") {
    return NextResponse.redirect(new URL("/platform/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/platform/:path*", "/admin/:path*", "/cms/:path*"],
};
