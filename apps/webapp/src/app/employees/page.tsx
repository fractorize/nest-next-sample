import { trpc } from "@web/app/trpc";
import EmployeeTable from "../components/employees/employee-table";
import Link from "next/link";

export default async function Home() {
  const employees = await trpc.employees.query();
  return (
    <main className="flex min-h-screen flex-col gap-2 p-24">
      <Link href="/" className="text-secondary text-lg">
        Dashboard
      </Link>
      <h1 className="text-lg font-bold">Employees</h1>
      <div className="z-10 w-full max-w-5xl ">
        <EmployeeTable employees={employees} />
      </div>
      <div className="flex">
        <button className="btn btn-sm  btn-primary">Add Employee</button>
      </div>
    </main>
  );
}
