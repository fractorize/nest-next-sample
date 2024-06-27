import { SetMetadata } from "@nestjs/common";

const AllowUnauthenticatedAccess = () =>
  SetMetadata('allowUnauthenticatedAccess', true);

export default AllowUnauthenticatedAccess;
