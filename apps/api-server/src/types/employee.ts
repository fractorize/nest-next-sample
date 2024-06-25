type EmployeeRowItem = {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email?: string;
  dateOfBirth?: Date;
};

type NewEmployee = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth?: Date;
  officialEmail: string;
  password: string;
};

export { EmployeeRowItem, NewEmployee };
