import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { sign } from 'jsonwebtoken';
import { Context } from 'src/context';
import crypto from 'crypto';
import { User } from '../models/user';
import { isAuthenticated } from '../middlewares/auth';

const { TOKEN_SECRET, TOKEN_EXPIRE_TIME } = process.env;

function generateSalt() {
  return crypto.randomBytes(16).toString('base64');
}

function generateHash(password: string, salt: string) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('base64');
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuthenticated)
  User() {
    return { id: 1, name: 'Homing Li', email: 'homing.li@mail.utor' };
  }

  @Mutation(() => User)
  async Signup(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const user = await User.findOne({ email });
    if (user) return new Error('User Already exist');
    const salt = generateSalt();
    // eslint-disable-next-line no-param-reassign
    password = generateHash(password, salt);
    const us = await User.create({ name, email, salt, password }).save();
    return us;
  }

  @Mutation(() => User)
  async Signin(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context,
  ) {
    const user = await User.findOne({ email });
    if (user && generateHash(password, user.salt) === user.password) {
      const token = sign({ email: user.email, name: user.name, id: user.id }, TOKEN_SECRET!, {
        expiresIn: TOKEN_EXPIRE_TIME });
      const { res } = ctx;
      res.cookie('token', token, {
        secure: true,
      });
      return user;
    }
    return new Error('Incorrect match of usename and password');
  }
}
