import {apiPOST } from "@web/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const newEmployee = await apiPOST("/employees", formData);
    if (!newEmployee) {
      throw new Error("Employee could not be created");
    }
    return NextResponse.redirect(new URL("/employees", request.nextUrl.origin));
  } catch (error: any) {
    console.log(error);
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
