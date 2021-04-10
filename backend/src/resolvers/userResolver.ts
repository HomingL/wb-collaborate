/* eslint-disable linebreak-style */
import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx, InputType, Field } from 'type-graphql';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';
import { Context } from 'src/context';
import { AuthenticationError } from 'apollo-server-express';
import { isAuthenticated } from '../middlewares/auth';
import { User } from '../models/user';
import { SigninResponse } from '../models/signinResponse';
import { Length, IsEmail, Matches } from "class-validator";

const { TOKEN_SECRET, TOKEN_EXPIRE_TIME } = process.env;

function generateSalt() {
  return crypto.randomBytes(16).toString('base64');
}

function generateHash(password: string, salt: string) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('base64');
}

@InputType()
class SignupInput {
  
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 30)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  password: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  @UseMiddleware(isAuthenticated)
  async User(
    @Ctx() ctx: Context,
  ) {
    return ctx.payload;
  }

  @Mutation(() => User)
  async Signup(
    @Arg("input") {name, email, password}: SignupInput,
  ) {

    const user = await User.findOne({ email });
    if (user) return new Error('User Already exist');
    const salt = generateSalt();
    const saltedHash = generateHash(password, salt);
    const us = await User.create({ name, email, salt, password: saltedHash }).save();
    return us;
  }

  @Mutation(() => SigninResponse)
  async Signin(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const user = await User.findOne({ email });
    if (user && generateHash(password, user.salt) === user.password) {
      const token = sign({ email: user.email, name: user.name, id: user.id }, TOKEN_SECRET!, {
        expiresIn: TOKEN_EXPIRE_TIME });
      const response : SigninResponse = { user, token };
      return response;
    }
    return new AuthenticationError('Incorrect match of usename and password');
  }
}
