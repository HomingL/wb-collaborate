import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  name: string;

  @Field()
  email: string;
}