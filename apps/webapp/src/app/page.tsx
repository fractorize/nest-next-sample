import { trpc } from "@web/app/trpc";
import EmployeeTable from "./components/employee-table";

export default async function Home() {
  // const employee = await trpc.employee.query({
  //   id: "clxd132hw000010g1jg8ssd5c",
  // });
  const employees = await trpc.employees.query();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <EmployeeTable employees={employees} />
      </div>
    </main>
  );
}
