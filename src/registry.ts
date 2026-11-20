import type { ComponentType } from 'react';

export interface TemplateEntry {
  id: string;
  version: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
}

const templates = new Map<string, TemplateEntry>();

export function listTemplates() {
  return Array.from(templates.values()).map(({ id, version }) => ({ id, version }));
}

export function getTemplate(id: string) {
  return templates.get(id);
}
