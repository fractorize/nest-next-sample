"use client";

import Alert from "@web/app/components/widgets/alert";
import DeleteButton from "@web/app/components/widgets/buttons/delete";
import Loading from "@web/app/components/widgets/loading";
import { trpc } from "@web/app/trpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [employee, setEmployee] = useState<any>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const employee = await trpc.employee.query({ id });
        setEmployee(employee);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const deleteEmployee = useMemo(() => {
    return async () => {
      try {
        await trpc.deleteEmployee.mutate({ id });
        router.push(`/employees`);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    };
  }, [employee]);

  return (
    <div className="p-10">
      {isLoading ? (
        <Loading />
      ) : employee ? (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              {employee.firstName} {employee.middleName} {employee.lastName}{" "}
            </h2>
            <p>DoB: {employee.dateOfBirth.toString()}</p>
            <div className="card-actions">
              <Link href={`/employees/${employee.id}/edit`}>
                <button className="btn btn-sm btn-primary">Edit</button>
              </Link>
              <DeleteButton
                deleteFn={deleteEmployee}
                suffix="Employee"
                confirmationMessage={`Do you really want to delete ${employee.firstName} ${employee.middleName || ""} ${employee.lastName} permanently?`}
              />
              <Link href={`/employees`}>
                <button className="btn btn-sm btn-ghost">Back to List</button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      {error ? (
        <Alert message={error.message || "Error occurred"} role="error" />
      ) : null}
    </div>
  );
}
