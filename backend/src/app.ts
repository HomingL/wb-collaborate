// .env
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/userResolver';

// require('dotenv').config();

const { PORT } = process.env;

const main = async () => {
  const app = express();

  app.get('/', (_, res) => {
    res.send('hello world!');
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  const port = PORT || 5000;
  app.listen(port, () => {
    console.log(`server started on localhost: ${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
