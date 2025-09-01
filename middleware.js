import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        if (pathname.startsWith("/admin")) return token?.role === "ADMIN";
        if (pathname.startsWith("/watch")) return !!token;
        if (pathname.startsWith("/api/download")) return !!token;
        return true;
      }
    }
  }
);

export const config = {
  matcher: ["/admin/:path*", "/watch/:path*", "/api/download/:path*"]
};
