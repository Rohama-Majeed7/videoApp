import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // You can add custom logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Check if the user is authenticated
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true; // User is authenticated
        }

        if (pathname === "/" || pathname.startsWith("/api/auth/video")) {
          // User is authenticated, allow access
          return true;
        }
        // If not authenticated, redirect to the login page
        return !!token; // User is not authenticated
      },
    },
  },
//   {
//     pages: {
//       signIn: "/login",
//       signOut: "/login",
//       error: "/login", // Error code passed in query string as ?error=
//     },
//   }
);

export const config = {
  matcher: ["/", "/dashboard/:path*", "/video/:path*", "/profile/:path*"],
};
