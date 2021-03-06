// import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { Context } from '../context';

const { TOKEN_SECRET } = process.env;

export const isAuthenticated: MiddlewareFn<Context> = ({ context }, next) => {
  const token = context.req.headers.authorization;
  if (!token) {
    throw new Error('Not authenticated, please log in');
  }

  try {
    const payload = verify(token.split(' ')[1], TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error('Authentication token is invalid, please log in again');
  }

  return next();
};
