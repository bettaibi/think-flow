import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const PROTECTED_ROUTES = [
  "/projects",
  "/calendar",
  "/trainings",
  "/media",
  "/sticky-notes",
];

export async function middleware(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session);

  const isProtectedRoute = PROTECTED_ROUTES.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  const isAuthRoute = req.nextUrl.pathname.startsWith("/sign-in");

  // Guard routes
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/projects", req.nextUrl));
  }

  // public routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
