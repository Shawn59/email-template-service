import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { env } from '../../config/env.ts';
import { verifyAuthToken, type AuthTokenPayload } from '../auth/token.ts';

declare module 'fastify' {
  interface FastifyRequest {
    authUser: AuthTokenPayload | null;
  }
}

/**
 * Читает JWT из httpOnly cookie и проверяет подпись через JWT_SECRET.
 * Без валидной подписи authUser остаётся null.
 */
const authPluginImpl: FastifyPluginAsync = async (app) => {
  app.decorateRequest('authUser', null);

  app.addHook('preHandler', async (request) => {
    const token = request.cookies[env.COOKIE_NAME];

    if (!token) {
      request.authUser = null;
      return;
    }

    try {
      request.authUser = await verifyAuthToken(token);
    } catch {
      request.authUser = null;
    }
  });
};

export const authPlugin = fp(authPluginImpl, { name: 'auth-plugin' });

/** Guard: без валидного JWT отвечаем 401 */
export async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
  if (!request.authUser) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}
