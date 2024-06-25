import React from "react";
import EmployeeRow from "./employee-row";
import { EmployeeRowItem } from "@api/types/employee";

const EmployeeTable = ({ employees }: { employees: EmployeeRowItem[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <td>Id</td>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((user, index) => (
            <EmployeeRow key={user.id} index={index} employee={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
