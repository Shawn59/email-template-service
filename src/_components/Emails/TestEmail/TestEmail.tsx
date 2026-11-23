import { Heading, Section, Text } from 'react-email';
import { EmailButton } from '../EmailButton/EmailButton';
import { EmailLayout } from '../EmailLayout/EmailLayout';
import * as React from 'react';
import { testEmailStyles } from './TestEmail.styles.ts';

interface WelcomeEmailProps {
  name: string;
  verificationUrl: string;
}

export const TestEmail = ({ name, verificationUrl }: WelcomeEmailProps) => (
  <EmailLayout titleH1={`Добро пожаловать, ${name}! Остался один шаг.`}>
    <Section style={testEmailStyles.contentSection}>
      <Heading style={testEmailStyles.heading}>Добро пожаловать, {name}! 👋</Heading>

      <Text style={testEmailStyles.text}>
        Спасибо за регистрацию на нашем сервисе. Мы рады видеть вас среди наших пользователей.
      </Text>

      <Text style={testEmailStyles.text}>
        Чтобы начать пользоваться всеми возможностями, подтвердите ваш email — это займёт всего пару секунд.
      </Text>

      <div style={testEmailStyles.buttonWrapper}>
        <EmailButton href={verificationUrl}>Подтвердить email</EmailButton>
      </div>

      <Text style={testEmailStyles.text}>
        Если кнопка не работает, скопируйте ссылку в браузер:
        <br />
        <a href={verificationUrl} style={{ color: '#0066ff', wordBreak: 'break-all' as const }}>
          {verificationUrl}
        </a>
      </Text>

      <Text style={testEmailStyles.note}>
        Ссылка действительна в течение 24 часов. Если вы не регистрировались, просто проигнорируйте это письмо.
      </Text>
    </Section>
  </EmailLayout>
);
