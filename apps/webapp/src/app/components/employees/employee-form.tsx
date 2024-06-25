"use client";

import { trpc } from "@web/app/trpc";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EmployeeForm({ employee }: { employee: any }) {
  const [employeeCopy, setEmployeeCopy] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (!employee) return;
    setEmployeeCopy({
      ...employee,
    });
  }, [employee]);

  const onChange = useMemo(() => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmployeeCopy((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  }, [employeeCopy]);

  const createNewEmployee = useMemo(() => {
    return async () => {
      try {
        if (!employeeCopy) return;
        await trpc.newEmployee.mutate({ data: employeeCopy });
        router.push(`/employees`);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    };
  }, [employeeCopy]);

  const updateEmployee = useMemo(() => {
    return async () => {
      try {
        if (!employeeCopy) return;
        await trpc.updateEmployee.mutate({
          id: employeeCopy.id,
          data: { ...employeeCopy, dateOfBirth: new Date() },
        });
        router.push(`/employees/${employeeCopy.id}`);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    };
  }, [employeeCopy]);

  const onSave = useMemo(() => {
    return employeeCopy?.id ? updateEmployee : createNewEmployee;
  }, [employeeCopy]);

  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
      {employeeCopy && (
        <div className="w-96 flex flex-col gap-4 form-control">
          <label className="input input-bordered flex items-center gap-2">
            First Name
            <input
              name="firstName"
              type="text"
              className="grow"
              value={employeeCopy.firstName || ""}
              onChange={onChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Middle Name
            <input
              name="middleName"
              type="text"
              className="grow"
              value={employeeCopy.middleName || ""}
              onChange={onChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Last Name
            <input
              name="lastName"
              type="text"
              className="grow"
              value={employeeCopy.lastName || ""}
              onChange={onChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              name="email"
              type="text"
              className="grow"
              placeholder="daisy@site.com"
              value={employeeCopy.officialEmail || ""}
              onChange={onChange}
            />
          </label>
          <button className="btn btn-primary" onClick={onSave}>
            Save
          </button>
          <Link
            href={
              employeeCopy.id ? `/employees/${employeeCopy.id}` : "/employees"
            }
            className="btn"
          >
            <button>Cancel</button>
          </Link>
        </div>
      )}
    </div>
  );
}
