import { Field, ObjectType } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class SigninResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
