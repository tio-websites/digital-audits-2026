import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Only these paths skip auth — everything else requires login
const PUBLIC_PATHS = ["/login", "/pdf"];
// Auth pages redirect logged-in users away (subset of PUBLIC_PATHS)
const AUTH_PAGES = ["/login"];

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublic = PUBLIC_PATHS.some((p) => path.startsWith(p));

  // Create a mutable response so Supabase SSR can refresh the session cookie
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Logged-in user visiting /login → send to home
  const isAuthPage = AUTH_PAGES.some((p) => path.startsWith(p));
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Unauthenticated user visiting any protected page → send to /login
  if (!isPublic && !user) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:png|svg|ico|jpg|jpeg|webp)$).*)",
  ],
};
