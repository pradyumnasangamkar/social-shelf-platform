import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Redirect logged-in users away from login/register pages
    if (
      (pathname === "/login" || pathname === "/register") &&
      req.nextauth.token
    ) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/"; // Change this to your default authenticated route
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow auth-related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/api/user/signup") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // Public routes
        if (pathname === "/") {
          return true;
        }

        // Protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
