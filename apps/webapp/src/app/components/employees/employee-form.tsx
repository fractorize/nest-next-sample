"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EmployeeForm({ employee }: { employee: any }) {
  const [employeeCopy, setEmployeeCopy] = useState<any>();
  const router = useRouter();
  const isNewEmployee = useMemo(() => !employee?.id, [employee]);

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
    return async (event: any) => {
      event.preventDefault();
      try {
        if (!employeeCopy) return;
        const formData = new FormData(event.target);
        const res = await fetch(`/api/employees`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        router.push(`/employees`);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    };
  }, [employeeCopy]);

  const updateEmployee = useMemo(() => {
    return async (event: any) => {
      event.preventDefault();
      try {
        if (!employeeCopy) return;
        const formData = new FormData(event.target);
        const res = await fetch(`/api/employees/${employeeCopy.id}`, {
          method: "PUT",
          body: formData,
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        router.push(`/employees/${employeeCopy.id}`);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    };
  }, [employeeCopy]);

  const onSave = useMemo(() => {
    return isNewEmployee ? createNewEmployee : updateEmployee;
  }, [updateEmployee, createNewEmployee]);

  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
      {employeeCopy && (
        <form
          onSubmit={onSave}
          className="w-96 flex flex-col gap-4 form-control"
        >
          <label className="input input-bordered flex items-center gap-2 text-gray-400">
            First Name
            <input
              name="firstName"
              type="text"
              className="grow text-black"
              value={employeeCopy.firstName || ""}
              onChange={onChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 text-gray-400">
            Middle Name
            <input
              name="middleName"
              type="text"
              className="grow text-black"
              value={employeeCopy.middleName || ""}
              onChange={onChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 text-gray-400">
            Last Name
            <input
              name="lastName"
              type="text"
              className="grow text-black"
              value={employeeCopy.lastName || ""}
              onChange={onChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 text-gray-400">
            Personal Email
            <input
              name="personalEmail"
              type="text"
              className="grow text-black"
              placeholder="daisy@site.com"
              value={employeeCopy.personalEmail || ""}
              onChange={onChange}
            />
          </label>
          {isNewEmployee && (
            <label className="input input-bordered flex items-center gap-2 text-gray-400">
              Official Email
              <input
                name="officialEmail"
                type="text"
                className="grow text-black"
                placeholder=""
                value={employeeCopy.officialEmail || ""}
                onChange={onChange}
              />
            </label>
          )}
          <button className="btn btn-primary">Save</button>
          <Link
            href={
              employeeCopy.id ? `/employees/${employeeCopy.id}` : "/employees"
            }
            className="btn"
          >
            <button>Cancel</button>
          </Link>
        </form>
      )}
    </div>
  );
}
