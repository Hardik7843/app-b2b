import { UserType } from "@/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

type AdminCheckResponse = {
  data: UserType | null;
  message: string;
  success: boolean;
  sessionToken?: string;
};

export default async function middleware(request: NextRequest) {
  console.log("Middleware invoked for URL:", request.url);
  // Only run on admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Get the session cookie
    const sessionToken = request.cookies.get("sessionToken")?.value;

    if (!sessionToken) {
      // No token, redirect to login
      console.log("No session token found, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Call your backend admin check endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/check`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
            // Include the cookie in the request header since we're server-side
            Cookie: `sessionToken=${sessionToken}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Backend response not ok, redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const session: AdminCheckResponse = await response.json();

      console.log("Middleware -> session", session);

      // Check if session is successful and has data
      if (session.success === false || !session.data) {
        console.log("Session unsuccessful or no data, redirecting to home");
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Check if user is admin and email is verified
      if (
        !session.data ||
        session.data?.type !== "ADMIN"
        // !session.data.emailVerified
      ) {
        console.log(
          "User not admin or email not verified, redirecting to login"
        );
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // All checks passed, allow access to admin area
      console.log("Admin authentication successful, allowing access");
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error);
      // Network error or other issues, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // For non-admin routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // Only run middleware on admin routes and their subroutes
  ],
};
