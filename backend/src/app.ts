// .env
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';

require('dotenv').config();

const { PORT } = process.env;

const main = async () => {
  const app = express();

  app.get('/', (_, res) => {
    res.send('hello world!');
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
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
