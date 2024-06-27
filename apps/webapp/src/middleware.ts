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
  const sessionExpires = cookieStore.get("sessionExpires")?.value;
  return (
    accessToken &&
    sessionExpires &&
    new Date() < new Date(parseInt(sessionExpires) * 1000)
  );
}
