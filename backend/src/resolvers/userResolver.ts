import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';
import { User } from '../models/user'

@Resolver()
export class UserResolver {
  
  @Query(() => User)
  User() {
    return {"name": "Homing Li", "email": "homing.li@mail.utoronto.ca"};
  }
}
