import 'fastify';
import type { FastifyRequest } from 'fastify';

export interface User {
  id: number;
  username: string;
  position: string;
  full_name: string;
  level: number;
  user_group: string;
  role: 'Super Administrator' | 'Administrator' | 'Editor' | 'Viewer';
}

declare module 'fastify' {
  interface FastifyInstance {
    models?: Record<string, any>;
    authenticate?: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
    checkRoles?: (
      allowedRoles: string[],
    ) => (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
    mysql?: any;
  }

  interface FastifyRequest {
    user?: User;
  }
}

export type FastifyAuthRequest<T = {}> = FastifyRequest<T> & {
  user: User;
};
