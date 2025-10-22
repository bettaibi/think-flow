import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "./utils/getServerSession";

const PROTECTED_ROUTES = [
  "/projects",
  "/calendar",
  "/trainings",
  "/media",
  "/sticky-notes",
];

export async function middleware(req: NextRequest) {
  const isProtectedRoute = PROTECTED_ROUTES.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // public routes
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const session = await getServerSession();

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
