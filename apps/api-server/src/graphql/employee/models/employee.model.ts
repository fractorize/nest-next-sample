import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field(() => String)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field({ nullable: true })
  middleName?: string;

  // @Field({ nullable: true })
  // personalEmail: string;

  // @Field({ nullable: true })
  // dateOfBirst: Date;
}
