import * as controller from './sample.controller';
import * as schema from './sample.schema';
import type { FastifyInstance } from 'fastify';

async function routes(fastify: FastifyInstance) {
   fastify.get('/', {
      schema: schema.search,
      preHandler: fastify.authenticate,
      handler: controller.search,
   });

   fastify.get('/:id', {
      schema: schema.getById,
      preHandler: fastify.authenticate,
      handler: controller.getById,
   });

   fastify.post('/', {
      schema: schema.insert,
      preHandler: fastify.authenticate,
      handler: controller.insert,
   });

   fastify.put('/:id', {
      schema: schema.update,
      preHandler: fastify.authenticate,
      handler: controller.update,
   });

   fastify.delete('/:id', {
      preHandler: fastify.authenticate,
      handler: controller.remove,
   });
}

export default routes;
