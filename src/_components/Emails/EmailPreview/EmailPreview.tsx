import { createElement, useEffect, useState, type ComponentType } from 'react';
import { render } from '@react-email/render';
import styles from './EmailPreview.module.scss';

interface EmailPreviewProps<P extends object> {
  component: ComponentType<P>;
  props: P;
}

/** Рендерит react-email в HTML и показывает в iframe — без вложенного <html> в DOM приложения */
export const EmailPreview = <P extends object>({ component, props }: EmailPreviewProps<P>) => {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    void render(createElement(component, props)).then((result) => {
      if (!cancelled) {
        setHtml(result);
      }
    });

    return () => {
      cancelled = true;
    };
    // props сериализуем, чтобы не дергать рендер на каждый новый объект с теми же полями
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component, JSON.stringify(props)]);

  if (!html) {
    return <div className={styles.loading}>{'Рендер шаблона...'}</div>;
  }

  return <iframe className={styles.frame} title="Email preview" srcDoc={html} />;
};
