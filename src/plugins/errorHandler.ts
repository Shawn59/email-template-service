import type { FastifyPluginAsync } from 'fastify';
import { env } from '../config/env';
export const errorHandler: FastifyPluginAsync = async (app) => {
  app.setErrorHandler((error, request, reply) => {
    request.log.error({ err: error }, 'Request failed');

    // Ошибки валидации Fastify
    if (error.validation) {
      return reply.status(400).send({
        error: 'Validation error',
        details: error.validation,
      });
    }

    const statusCode = error.statusCode ?? 500;

    return reply.status(statusCode).send({
      error: statusCode >= 500 ? 'Internal Server Error' : error.message,
      ...(env.NODE_ENV !== 'production' && statusCode >= 500 ? { stack: error.stack } : {}),
    });
  });

  app.setNotFoundHandler((request, reply) => {
    return reply.status(404).send({
      error: 'Not Found',
      path: request.url,
      method: request.method,
    });
  });
};
