import EmployeeTable from "../components/employees/employee-table";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  // const employees = await trpc.employees.query();
  const employees: any = [];
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
        <Link href="/employees/new">
          <button className="btn btn-sm  btn-primary">Add Employee</button>
        </Link>
      </div>
    </main>
  );
}
