import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = ["/login", "/api/auth/login"];

export function middleware(request: NextRequest) {
  if (!loggedIn() && !publicRoutes.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/login", request.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};

function loggedIn() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionExpiresAt = cookieStore.get("sessionExpires")?.value;
  // if (accessToken && sessionExpiresAt) {
  //   if (new Date() > new Date(parseInt(sessionExpiresAt) * 1000)) {
  //     console.log("SESSION EXPIRED");
  //   } else {
  //     console.log("SESSION ACTIVE");
  //   }
  // }
  return (
    accessToken &&
    sessionExpiresAt &&
    new Date() < new Date(parseInt(sessionExpiresAt) * 1000)
  );
}
