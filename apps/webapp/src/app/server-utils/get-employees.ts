"use server";

import { apiGET } from "@web/utils/api";

export default async function getEmployees() {
  try {
    const employees = await apiGET("/employees");
    return employees;
  } catch (error) {
    console.log("error", error);
    throw new Error("Employees not found");
  }
}
