import { apiDELETE, apiGET, apiPOST } from "@web/utils/api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("GETTING", `/employees/${params.id}`);
    const employee = await apiGET(`/employees/${params.id}`);
    return NextResponse.json(employee);
  } catch (error) {
    console.log("error", error);
    throw new Error("Employee not found");
  }
}

export async function POST(request: NextRequest) {
  // try {
  //   const formData = await request.formData();
  //   const { accessToken } = await apiPOST("/auth/login", formData);
  //   if (!accessToken) {
  //     throw new Error("Unauthorized");
  //   }
  //   const user = jwtDecode(accessToken);
  //   const cookieStore = cookies();
  //   cookieStore.set("accessToken", accessToken);
  //   cookieStore.set("sessionExpires", `${user.exp}`);
  //   return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  // } catch (error: any) {
  //   const { message, status } =
  //     error.statusCode === 401
  //       ? { message: "Invalid credentials", status: 401 }
  //       : {
  //           message: error.message || "An unexpected error occurred",
  //           status: 500,
  //         };
  //   return NextResponse.json({ message }, { status });
  // }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await apiDELETE(`/employees/${params.id}`);
    return NextResponse.redirect(new URL("/employees", request.nextUrl.origin));
  } catch (error) {
    console.log("error", error);
    throw new Error("Employee not found");
  }
}
