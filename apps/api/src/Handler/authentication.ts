import fp from 'fastify-plugin';
import ApiError from '../apiError';
import type {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

async function authMiddleware(
  fastify: FastifyInstance,
  options: any,
) {
  fastify.decorate('checkRoles', (allowedRoles: string[]) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
        const user: any = request.user;

        if (!user || !user.role) {
          throw new ApiError('User role not found in token.');
        }

        if (!allowedRoles.includes(user.role)) {
          throw new ApiError(
            'You are not authorized to perform this action.',
          );
        }
      } catch (err: any) {
        reply.code(403).send({ error: err.message });
      }
    };
  });
}

export default fp(authMiddleware);
