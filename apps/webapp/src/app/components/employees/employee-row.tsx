import Link from "next/link";
import React from "react";

export default function EmployeeRow({
  index,
  employee,
}: {
  index: number;
  employee: any;
}) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{employee.id}</td>
      <td>
        {employee.firstName} {employee.lastName}
      </td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>
        <Link href={`/employees/${employee.id}`}>
          <button className="btn btn-primary btn-xs">View Profile</button>
        </Link>
      </td>
    </tr>
  );
}
