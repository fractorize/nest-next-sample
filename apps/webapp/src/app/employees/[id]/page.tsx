import { trpc } from "@web/app/trpc";
import Link from "next/link";

export const revalidate = 0;

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const employee = await trpc.employee.query({ id });

  return (
    <div className="p-10">
      {employee && (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              {employee.firstName} {employee.middleName} {employee.lastName}{" "}
            </h2>
            <p>DoB: {employee.dateOfBirth}</p>
            <div className="card-actions">
              <Link href={`/employees/${employee.id}/edit`}>
                <button className="btn btn-sm btn-primary">Edit</button>
              </Link>
              <button className="btn btn-sm btn-error">Delete</button>
              <Link href={`/employees`}>
                <button className="btn btn-sm btn-ghost">Back to List</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
