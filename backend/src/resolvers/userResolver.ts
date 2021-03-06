import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { sign } from 'jsonwebtoken';
import { User } from '../models/user';

const jwtSecret = 'wb_collaborate_secret';

interface U {
  id: number,
  name: string,
  password: string,
  email: string,
}

const users: U[] = [];
let id = 0;
@Resolver()
export class UserResolver {
  @Query(() => User)
  User() {
    return { id: 1, name: 'Homing Li', email: 'homing.li@mail.utor' };
  }

  @Mutation(() => User)
  Signup(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const user = { id, name, email, password } as U;
    users.push(user);
    console.log(users);
    id++;
    return user;
  }

  @Mutation(() => String)
  Signin(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      const token = sign({ email: user.email, name: user.name, id: user.id }, jwtSecret, { expiresIn: '10min' });
      return token;
    }
    return 'not found'; // return error to user to let them know the password is incorrect, need to think about how to do this one
  }
}
