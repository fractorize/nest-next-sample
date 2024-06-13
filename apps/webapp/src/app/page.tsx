import { trpc } from "@web/app/trpc";

export default async function Home() {
  const employee = await trpc.employee.query({
    id: "clxd132hw000010g1jg8ssd5c",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Welcome to Webapp</h1>
        {/* {employee?.greeting} */}
        {(employee && (
          <div
            key={employee.id}
            className="flex flex-col items-center justify-center p-4 m-4 bg-gray-100 rounded-xl dark:bg-zinc-800/30"
          >
            <p>
              {employee.firstName} {employee.middleName} {employee.lastName}
            </p>
            <p>{employee.id}</p>
          </div>
        )) || <p>Loading...</p>}
      </div>
    </main>
  );
}
