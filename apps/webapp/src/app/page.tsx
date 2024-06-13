import { trpc } from "@web/app/trpc";
import Link from "next/link";

export default async function Home() {
  const employees = await trpc.employees.query();
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1 className="text-4xl font-bold mb-20">
        Welcome to Postgresql / Prisma / NestJs / tRPC / NextJS / DaisyUI Sample
      </h1>
      <Link href="/employees" className="text-blue-500 text-lg">
        Employees
      </Link>
    </main>
  );
}
