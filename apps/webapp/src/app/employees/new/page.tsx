import EmployeeForm from "@web/app/components/employees/employee-form";

export default function page() {
  const newEmployee = {};
  return <EmployeeForm employee={newEmployee} />;
}
