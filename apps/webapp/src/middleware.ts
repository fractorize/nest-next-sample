import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/api/auth/login"];

export function middleware(request: NextRequest) {
  // if (
  //   !request.cookies.get("user")?.value &&
  //   !publicRoutes.includes(request.nextUrl.pathname)
  // ) {
  //   return Response.redirect(new URL("/login", request.nextUrl.origin));
  // }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
