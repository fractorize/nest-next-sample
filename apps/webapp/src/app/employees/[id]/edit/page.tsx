import EmployeeForm from "@web/app/components/employees/employee-form";

export const revalidate = 0;

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  // const employee = await trpc.employee.query({ id });
  const employee = {};
  return <EmployeeForm employee={employee} />;
}
