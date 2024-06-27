import EmployeeForm from "@web/app/components/employees/employee-form";
import getEmployee from "@web/app/server-utils/get-employee";

export const revalidate = 0;

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const employee = await getEmployee(id);
  return <EmployeeForm employee={employee} />;
}
