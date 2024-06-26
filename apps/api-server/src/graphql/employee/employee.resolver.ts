import { Resolver, Args, Int, Query } from '@nestjs/graphql';
import { Employee } from './models/employee.model';
import { EmployeeService } from '@api/graphql/employee/employee.service';

@Resolver((of: any) => Employee)
export class EmployeeResolver {
  constructor(
    private employeeService: EmployeeService,
    // private postsService: PostsService,
  ) {}

  @Query((returns: any) => Employee, { name: 'employee', nullable: true })
  async getEmployee(@Args('id', { type: () => String }) id: string) {
    return this.employeeService.getEmployeeById({ id });
  }

  // @ResolveField('posts', returns => [Post])
  // async getPosts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
