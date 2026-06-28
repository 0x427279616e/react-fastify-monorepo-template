import * as service from './personal-info.service';
import type { FastifyReply } from 'fastify';
import type { FastifyAuthRequest } from '../../types/fastify';
import type {
   InsertPersonalInfo,
   SearchablePersonalInfo,
   UpdatePersonalInfo,
} from '@template/shared/model';

export async function search(
   req: FastifyAuthRequest<{
      Querystring: SearchablePersonalInfo;
   }>,
   reply: FastifyReply,
) {
   const result = await service.search(req.query);
   return reply.send(result);
}

export async function getById(
   req: FastifyAuthRequest<{ Params: { id: number } }>,
   reply: FastifyReply,
) {
   const result = await service.getById(req.params.id);
   return reply.send(result);
}

export async function insert(
   req: FastifyAuthRequest<{ Body: InsertPersonalInfo }>,
   reply: FastifyReply,
) {
   const result = await service.insert(req.body);
   return reply.send(result);
}

export async function update(
   req: FastifyAuthRequest<{
      Params: { id: number };
      Body: UpdatePersonalInfo;
   }>,
   reply: FastifyReply,
) {
   const result = await service.update(req.params.id, req.body);
   return reply.send(result);
}

export async function remove(
   req: FastifyAuthRequest<{ Params: { id: number } }>,
   reply: FastifyReply,
) {
   await service.remove(req.params.id);
   return reply.code(204).send();
}
