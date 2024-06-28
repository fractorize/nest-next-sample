import EmployeeForm from "@web/app/components/employees/employee-form";

export default function page() {
  const newEmployee = {
    firstName: "Alice",
    lastName: "Wonder",
    middleName: "L",
    dateOfBirth: "1990-01-01",
    officialEmail: "alice@example.com",
    personalEmail: "alice.p@example.com",
  };
  return <EmployeeForm employee={newEmployee} />;
}
