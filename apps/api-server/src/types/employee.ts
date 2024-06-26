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
  companyId: string;
};

type Resource = {
  companyId: string;
  uri: string;
};

type Permission = {
  type: string;
  resource: Resource;
};

type Role = {
  name: string;
  permissions: Permission[];
};

type UserSignIn = {
  id: string;
  companyId: string;
  officialEmail: string;
  passwordHash: string;
  roles: Role[];
  employeeRecord: {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
  };
};

export { EmployeeRowItem, NewEmployee, UserSignIn };
