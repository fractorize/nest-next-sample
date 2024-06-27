import { apiPOST } from "@web/utils/api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const res = await apiPOST("/auth/login", formData);
    if (!res.ok) {
      throw await res.json();
    }
    const { accessToken } = await res.json();
    const user = jwtDecode(accessToken);
    const cookieStore = cookies();
    cookieStore.set("accessToken", accessToken);
    cookieStore.set("sessionExpires", `${user.exp}`);
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  } catch (error: any) {
    const { message, status } =
      error.statusCode === 401
        ? { message: "Invalid credentials", status: 401 }
        : {
            message: error.message || "An unexpected error occurred",
            status: 500,
          };
    return NextResponse.json({ message }, { status });
  }
}
