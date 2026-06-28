import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import compress from '@fastify/compress';
import jwt from '@fastify/jwt';
import sensible from '@fastify/sensible';
import authPlugin from './Handler/authentication';
import { pool, setDbLogger } from './config/database/db';

const app = Fastify({
   bodyLimit: 20 * 1048576,
   logger: true,
});

app.register(cors, { origin: '*' });

app.register(multipart, {
   limits: { fileSize: 300 * 1024 * 1024 },
});

app.register(compress, {
   global: true,
   threshold: 1024,
   encodings: ['gzip', 'deflate'],
});

app.register(jwt, {
   secret: process.env.AUTH_JWT_KEY!,
   sign: { expiresIn: process.env.AUTH_JWT_EXPIRATION || '24h' },
});

app.register(sensible);

app.register(authPlugin);

setDbLogger(app.log);

app.addHook('preHandler', async (request, reply) => {
   const devUser = {
      id: 1,
      name: 'admin',
   };

   if (process.env.NODE_ENV === 'dev') {
      if (!('authorization' in request.headers)) {
         const jwtToken = app.jwt.sign(devUser);
         request.headers.authorization = `Bearer ${jwtToken}`;
      }
      if (!('x-api-key' in request.headers)) {
         request.headers['x-api-key'] = process.env.API_KEY!;
      }
   }
});

app.decorate('authenticate', async function (request, reply) {
   try {
      await request.jwtVerify();
   } catch (err) {
      reply.status(401).send({ error: 'Access Denied' });
   }
});

// add routes by using its folder name
const routes = ['personal-info'];

// register routes
routes.forEach((routeName) => {
   const { default: routes } = require(
      `./modules/${routeName}/${routeName}.routes.js`,
   );
   app.register(routes, { prefix: `/api/${routeName}` });
   app.log.info(
      `/modules/${routeName}/${routeName}.routes.js -------> /api/${routeName}`,
   );
});

const start = async () => {
   const SERVER_PORT = process.env.SERVER_PORT || 4000;
   const SERVER_HOST = process.env.SERVER_HOST || '0.0.0.0';

   try {
      await app.listen({
         port: Number(SERVER_PORT),
         host: SERVER_HOST as string,
      });
      app.log.info(`server listening on ${SERVER_HOST}:${SERVER_PORT}`);
   } catch (err) {
      app.log.error(err);
      process.exit(1);
   }
};

const shutdown = async () => {
   pool.end();
   process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
