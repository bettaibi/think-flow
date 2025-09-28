import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PROTECTED_ROUTES = [
  "/projects",
  "/calendar",
  "/trainings",
  "/media",
  "/sticky-notes",
];

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = nextUrl.pathname.startsWith("/sign-in");

  // Guard routes

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/projects", nextUrl));
  }

  // public routes
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
