import { apiDELETE, apiGET, apiPOST, apiPUT } from "@web/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await apiGET(`/employees/${params.id}`);
    return NextResponse.json(employee);
  } catch (error) {
    console.log("error", error);
    throw new Error("Employee not found");
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const updadetEmployee = await apiPUT(`/employees/${params.id}`, formData);
    if (!updadetEmployee) {
      throw new Error("Employee data could not be updated");
    }
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  } catch (error: any) {
    // console.log(error);
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
