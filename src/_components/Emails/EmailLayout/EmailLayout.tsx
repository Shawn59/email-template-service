import { Body, Container, Head, Html, Preview } from 'react-email';
import type { ReactNode } from 'react';
import { HeaderEmail } from './HeaderEmail/HeaderEmail.tsx';
import { FooterEmail } from './FooterEmail/FooterEmail.tsx';

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

const body = {
  backgroundColor: '#f3f4f6',
  fontFamily: 'Arial, sans-serif',
  margin: 0,
  padding: 0,
};

const container = {
  backgroundColor: '#ffffff',
  maxWidth: '600px',
  margin: '40px auto',
  borderRadius: '8px',
  overflow: 'hidden' as const,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
};

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => (
  <Html lang="ru">
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    </Head>
    <Preview>{preview}</Preview>
    <Body style={body}>
      <Container style={container}>
        <HeaderEmail />
        {children}
        <FooterEmail />
      </Container>
    </Body>
  </Html>
);
