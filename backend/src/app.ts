/* eslint-disable linebreak-style */
// .env
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/userResolver';
import { WhiteboardResolver } from './resolvers/whiteboardResolver';

// require('dotenv').config();

const { PORT, FRONT_END_ORIGIN } = process.env;

const main = async () => {
  const app = express();

  app.get('/', (_, res) => {
    res.send('hello world!');
  });

  await createConnection();

  const corsOptions = {
    origin: FRONT_END_ORIGIN,
    credentials: true,
  };
  app.use(cors(corsOptions));
  // app.use(cookieParser());

  // establish socket.io server
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: FRONT_END_ORIGIN,
    } });
  const roomUsers:{ [roomId:string] : { [socketId:string] : string } } = {};

  httpServer.listen(5001);

  function isAuth(token:string) {
    // TODO: user authentication
    if (token) return true;
    return false;
  }

  io.use((socket, next) => {
    if (!isAuth(socket.handshake.auth.token)) return next(new Error('Permission denied!'));
    return next();
  }).on('connection', (socket:Socket) => {
    console.log('socket.io connected');
    const roomId = socket.handshake.query.roomId as string;
    console.log('join room:', roomId);
    if (roomId) socket.join(roomId);
    else return console.error('roomId is undefined');
    if (!roomUsers[roomId]) roomUsers[roomId] = {};
    if (!roomUsers[roomId][socket.id]) roomUsers[roomId][socket.id] = socket.id;

    console.log(roomUsers);

    // update all users
    socket.to(roomId).emit('allUserIds', Object.values(roomUsers[roomId]));
    // update self
    socket.emit('init', { selfId: socket.id, allUserIds: Object.values(roomUsers[roomId]) });

    socket.on('notifyPeers', (data) => {
      // console.log(data.from, ' sending hello to ', data.to);
      socket.to(data.to).emit('hello', { signalData: data.signalData, initiatorId: data.from });
    });

    socket.on('acceptConn', (data) => {
      // console.log('sending acceptance message from ', socket.id);
      socket.to(data.to).emit('accepted', { targetId: socket.id, signalData: data.signalData });
    });

    socket.on('disconnect', () => {
      delete roomUsers[roomId][socket.id];
      socket.leave(roomId);
      socket.to(roomId).emit('allUserIds', Object.values(roomUsers[roomId]));
    });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, WhiteboardResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: corsOptions });

  const port = PORT || 5000;
  app.listen(port, () => {
    console.log(`server started on localhost: ${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
