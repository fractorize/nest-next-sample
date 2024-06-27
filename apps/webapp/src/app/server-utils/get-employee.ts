"use server";

import { apiGET } from "@web/utils/api";

export default async function getEmployee(id: string) {
  try {
    const employee = await apiGET(`/employees/${id}`);
    return employee;
  } catch (error) {
    console.log("error", error);
    throw new Error("Employee not found");
  }
}
