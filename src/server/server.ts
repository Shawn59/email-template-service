import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { env } from '../config/env.ts';
import { errorHandler } from '../plugins/errorHandler.ts';
import { authPlugin } from './plugins/auth.ts';
import { authRoutes } from '../routes/auth.ts';
import { templatesRoutes } from '../routes/templates.ts';
import { healthRoutes } from '../routes/health.ts';

const app = Fastify({
  logger: {
    level: env.LOG_LEVEL,
    transport: env.NODE_ENV === 'development' ? { target: 'pino-pretty', options: { colorize: true } } : undefined,
  },
  disableRequestLogging: env.NODE_ENV === 'production',
});

await app.register(cors, {
  origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
  methods: ['GET', 'POST'],
  credentials: true,
});

await app.register(cookie);
await app.register(errorHandler);
await app.register(authPlugin);

await app.register(healthRoutes);
await app.register(authRoutes);
await app.register(templatesRoutes);

try {
  await app.listen({ port: env.PORT, host: env.HOST });
  app.log.info(`Email template service ready at http://${env.HOST}:${env.PORT}`);
  app.log.info(`Preview: http://${env.HOST}:${env.PORT}/api/templates`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

const close = async (signal: string) => {
  app.log.info(`${signal} received, shutting down...`);
  await app.close();
  process.exit(0);
};

process.on('SIGTERM', () => close('SIGTERM'));
process.on('SIGINT', () => close('SIGINT'));
