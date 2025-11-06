import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { application } from "./config/app-config";

const PROTECTED_ROUTES = [
  "/projects",
  "/calendar",
  "/trainings",
  "/media",
  "/sticky-note"
];

export async function middleware(req: NextRequest) {
  const isProtectedRoute = PROTECTED_ROUTES.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // public routes
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  /**
   * THIS IS NOT SECURE!
   * This is the recommended approach to optimistically redirect users
   * For security: use getServerSession utility function
   */
  const session = getSessionCookie(req, {
    cookiePrefix: application.name,
  });

  // Guard routes
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  const isAuthRoute = req.nextUrl.pathname.startsWith("/sign-in");

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/projects", req.nextUrl));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
