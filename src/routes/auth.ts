import type { FastifyPluginAsync, FastifyReply } from 'fastify';
import { timingSafeEqual } from 'node:crypto';
import { env } from '../config/env.ts';
import { jwtExpiresInSeconds, signAuthToken } from '../server/auth/token.ts';
import { requireAuth } from '../server/plugins/auth.ts';

interface LoginBody {
  login?: string;
  password?: string;
}

function secretsMatch(input: string, expected: string): boolean {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(inputBuffer, expectedBuffer);
}

function setAuthCookie(reply: FastifyReply, token: string) {
  reply.setCookie(env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: jwtExpiresInSeconds,
  });
}

export const authRoutes: FastifyPluginAsync = async (app) => {
  /**
   * POST /api/auth/login
   * Сравнивает login/password с LOGIN и PASSWORD из .env.
   * При совпадении подписывает JWT и кладёт его в httpOnly cookie.
   */
  app.post<{ Body: LoginBody }>('/api/auth/login', async (request, reply) => {
    const login = request.body?.login?.trim() ?? '';
    const password = request.body?.password ?? '';

    if (!login || !password) {
      return reply.status(400).send({ error: 'Login and password are required' });
    }

    const loginOk = secretsMatch(login, env.LOGIN);
    const passwordOk = secretsMatch(password, env.PASSWORD);

    if (!loginOk || !passwordOk) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const token = await signAuthToken({ login });
    setAuthCookie(reply, token);

    return { user: { id: login, login } };
  });

  /**
   * GET /api/auth/me
   * Клиент не читает cookie сам — спрашивает сервер, валиден ли JWT.
   */
  app.get('/api/auth/me', { preHandler: requireAuth }, async (request) => {
    const { login } = request.authUser!;
    return { user: { id: login, login } };
  });

  /**
   * POST /api/auth/logout
   * Стирает cookie — JWT больше не уходит на сервер.
   */
  app.post('/api/auth/logout', async (_request, reply) => {
    reply.clearCookie(env.COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { ok: true };
  });
};
