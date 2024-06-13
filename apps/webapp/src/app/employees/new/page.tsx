"use client";

import { trpc } from "@web/app/trpc";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page() {
  const [employee, setEmployee] = useState<any>({});
  const router = useRouter();

  const onChange = useMemo(() => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmployee((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  }, [employee]);

  const onSave = useMemo(() => {
    return async () => {
      try {
        await trpc.newEmployee.mutate({ data: employee });
        router.push(`/employees`);
      } catch (error) {
        console.log(error);
      }
    };
  }, [employee]);

  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
      <div className="w-96 flex flex-col gap-4 form-control">
        <label className="input input-bordered flex items-center gap-2">
          First Name
          <input
            name="firstName"
            type="text"
            className="grow"
            value={employee.firstName || ""}
            onChange={onChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Middle Name
          <input
            name="middleName"
            type="text"
            className="grow"
            value={employee.middleName || ""}
            onChange={onChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Last Name
          <input
            name="lastName"
            type="text"
            className="grow"
            value={employee.lastName || ""}
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
            onChange={onChange}
          />
        </label>
        <button className="btn btn-primary" onClick={onSave}>
          Save
        </button>
        <Link href="/employees" className="btn">
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
}
