import { apiPOST } from "@web/utils/api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const res = await apiPOST("/auth/login", formData);
    if (!res.ok) {
      throw await res.json();
    }
    const user = await res.json();
    console.log(user);
    cookies().set("user", JSON.stringify(user));
    cookies().set("session", res.headers.get("set-cookie")!);
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
