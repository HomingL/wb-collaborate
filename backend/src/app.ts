/* eslint-disable no-await-in-loop */
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

const { PORT, FRONT_END_ORIGIN, PORT_SOCKET } = process.env;

const boot = async () => {
  const app = express();

  app.get('/', (_, res) => {
    res.send('backend connected!');
  });

  app.use((req, _res, next) => {
    console.log('HTTP request', req.method, req.url, req.body);
    next();
  });

  /* For multiple attempts to connect to database, sometimes the backend container try to connect
  before database container is fully initialized */
  let retries = 5;
  while (retries) {
    try {
      await createConnection();
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 10000));
    }
  }

  const corsOptions = {
    origin: FRONT_END_ORIGIN,
    credentials: true,
  };
  app.use(cors(corsOptions));

  // establish socket.io server
  const port = PORT || 5000;

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, WhiteboardResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app,
    cors: corsOptions,
    bodyParserConfig: {
      limit: '100mb',
    } });

  /* socket server and http server */
  const socketServer = createServer(app);
  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    console.log(`HTTP server started on: ${port}`);
  });

  const io = new Server(socketServer, {
    cors: {
      origin: FRONT_END_ORIGIN,
    } });
  const roomUsers:{ [roomId:string] : { [socketId:string] : string } } = {};

  socketServer.listen(PORT_SOCKET || 5001, () => {
    console.log(`socket server started on :${PORT_SOCKET}`);
  });

  function isAuth(token:string) {
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
      socket.to(data.to).emit('hello', { signalData: data.signalData, initiatorId: data.from });
    });

    socket.on('acceptConn', (data) => {
      socket.to(data.to).emit('accepted', { targetId: socket.id, signalData: data.signalData });
    });

    socket.on('disconnect', () => {
      delete roomUsers[roomId][socket.id];
      socket.leave(roomId);
      socket.to(roomId).emit('allUserIds', Object.values(roomUsers[roomId]));
    });
  });
};

boot().catch((err) => {
  console.error(err);
});
