import Fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from '../config/env.ts';
import { errorHandler } from './plugins/errorHandler';
import { templatesRoutes } from './routes/templates';
import { healthRoutes } from './routes/health';

const app = Fastify({
  logger: {
    level: env.LOG_LEVEL,
    transport: env.NODE_ENV === 'development' ? { target: 'pino-pretty', options: { colorize: true } } : undefined,
  },
  disableRequestLogging: env.NODE_ENV === 'production',
});

// CORS — разрешаем админке и другим сервисам обращаться к API
await app.register(cors, {
  origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
  methods: ['GET', 'POST'],
});

// Единый обработчик ошибок
await app.register(errorHandler);

// Роуты
await app.register(healthRoutes);
await app.register(templatesRoutes);

// Запуск
try {
  await app.listen({ port: env.PORT, host: env.HOST });
  app.log.info(`📧 Email template service ready at http://${env.HOST}:${env.PORT}`);
  app.log.info(`   Preview: http://${env.HOST}:${env.PORT}/api/templates`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

// Graceful shutdown
const close = async (signal: string) => {
  app.log.info(`${signal} received, shutting down...`);
  await app.close();
  process.exit(0);
};

process.on('SIGTERM', () => close('SIGTERM'));
process.on('SIGINT', () => close('SIGINT'));
