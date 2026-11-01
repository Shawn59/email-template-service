import type { FastifyPluginAsync } from 'fastify';
import { render } from '@react-email/render';
import { toPlainText } from '@react-email/render';
import { createElement } from 'react';
import { getTemplate, listTemplates } from '../registry';

interface RenderParams {
  id: string;
}

interface RenderQuery {
  format?: 'html' | 'text' | 'json';
}

export const templatesRoutes: FastifyPluginAsync = async (app) => {
  /**
   * GET /api/templates
   * Список всех шаблонов с метаданными
   */
  app.get('/api/templates', async () => {
    return { templates: listTemplates() };
  });

  /**
   * POST /api/templates/:id/render
   * Рендер шаблона в HTML (по умолчанию) или text/json
   *
   * Body: переменные шаблона (валидируются Zod-схемой)
   * Query: ?format=html|text|json
   */
  app.post<{ Params: RenderParams; Body: Record<string, unknown>; Querystring: RenderQuery }>(
    '/api/templates/:id/render',
    async (request, reply) => {
      const entry = getTemplate(request.params.id);

      if (!entry) {
        return reply.status(404).send({
          error: 'Template not found',
          id: request.params.id,
          available: listTemplates().map((t) => t.id),
        });
      }

      // Валидация входных переменных
      const parsed = entry.schema.safeParse(request.body ?? {});

      if (!parsed.success) {
        return reply.status(400).send({
          error: 'Invalid template variables',
          templateId: entry.id,
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join('.'),
            message: i.message,
            code: i.code,
          })),
        });
      }

      // Рендер React-компонента в HTML
      const html = await render(createElement(entry.component, parsed.data));

      const format = request.query.format ?? 'html';

      if (format === 'text') {
        return reply.type('text/plain; charset=utf-8').send(toPlainText(html));
      }

      if (format === 'json') {
        return reply.send({
          templateId: entry.id,
          version: entry.version,
          html,
          text: toPlainText(html),
        });
      }

      return reply.type('text/html; charset=utf-8').send(html);
    },
  );

  /**
   * POST /api/templates/:id/preview
   * Тот же рендер, но с тестовыми данными (для отладки)
   * Полезно для быстрой проверки из браузера/curl без реальных данных
   */
  app.get<{ Params: RenderParams }>('/api/templates/:id/preview', async (request, reply) => {
    const entry = getTemplate(request.params.id);
    if (!entry) return reply.status(404).send({ error: 'Template not found' });

    // Пытаемся сгенерировать минимальные валидные данные из схемы
    const sample = generateSampleData(entry.schema);

    const html = await render(createElement(entry.component, sample));
    return reply.type('text/html; charset=utf-8').send(html);
  });
};

/**
 * Утилита: строит «примерные» данные из Zod-схемы,
 * чтобы можно было посмотреть превью без реальных переменных.
 * Работает для простых схем (string, number, boolean, url, object, array).
 */
function generateSampleData(schema: unknown): Record<string, unknown> {
  const shape = (schema as { shape?: Record<string, unknown> })?.shape;
  if (!shape) return {};

  const result: Record<string, unknown> = {};

  for (const [key, field] of Object.entries(shape)) {
    const description = (field as { description?: string }).description?.toLowerCase() ?? '';

    if (description.includes('url')) {
      result[key] = `https://example.com/${key}`;
    } else if (description.includes('email')) {
      result[key] = 'user@example.com';
    } else if (key.toLowerCase().includes('url')) {
      result[key] = `https://example.com/${key}`;
    } else if (key.toLowerCase().includes('email')) {
      result[key] = 'user@example.com';
    } else if (key.toLowerCase().includes('name')) {
      result[key] = 'Иван Иванов';
    } else {
      result[key] = `sample ${key}`;
    }
  }

  return result;
}
