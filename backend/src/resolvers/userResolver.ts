import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { sign } from 'jsonwebtoken';
import { Context } from 'src/context';
import { User } from '../models/user';
import { isAuthenticated } from '../middlewares/auth';

const { TOKEN_SECRET, TOKEN_EXPIRE_TIME } = process.env;

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
  @UseMiddleware(isAuthenticated)
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

  @Mutation(() => User)
  Signin(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context,
  ) {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      // ! of TOKEN_SECRET tells typescript this will be defined
      const token = sign({ email: user.email, name: user.name, id: user.id }, TOKEN_SECRET!, {
        expiresIn: TOKEN_EXPIRE_TIME });
      const { res } = ctx;
      // console.log("TOken scret is:", TOKEN_SECRET);
      res.cookie('token', token, {
        secure: true,
      });
      return user;
    }
    return 'not found'; // return error to user to let them know the password is incorrect, need to think about how to do this one
  }
}
