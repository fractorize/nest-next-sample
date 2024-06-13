import React from "react";
import EmployeeRow from "./employee-row";

const EmployeeTable = ({ employees }: { employees: any[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <td>Id</td>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
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
