import { Heading, Section, Text } from 'react-email';
import { EmailButton } from '../EmailButton/EmailButton';
import { EmailLayout } from '../EmailLayout/EmailLayout';

interface WelcomeEmailProps {
  name: string;
  verificationUrl: string;
}

const contentSection = {
  padding: '32px',
};

const heading = {
  color: '#111827',
  fontSize: '24px',
  fontWeight: 'bold' as const,
  lineHeight: '32px',
  margin: '0 0 16px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const buttonWrapper = {
  margin: '24px 0',
  textAlign: 'center' as const,
};

const note = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '24px 0 0',
  padding: '16px',
  backgroundColor: '#f9fafb',
  borderRadius: '6px',
};

export const WelcomeEmail = ({ name, verificationUrl }: WelcomeEmailProps) => (
  <EmailLayout preview={`Добро пожаловать, ${name}! Остался один шаг.`}>
    <Section style={contentSection}>
      <Heading style={heading}>Добро пожаловать, {name}! 👋</Heading>

      <Text style={text}>Спасибо за регистрацию на нашем сервисе. Мы рады видеть вас среди наших пользователей.</Text>

      <Text style={text}>
        Чтобы начать пользоваться всеми возможностями, подтвердите ваш email — это займёт всего пару секунд.
      </Text>

      <div style={buttonWrapper}>
        <EmailButton href={verificationUrl}>Подтвердить email</EmailButton>
      </div>

      <Text style={text}>
        Если кнопка не работает, скопируйте ссылку в браузер:
        <br />
        <a href={verificationUrl} style={{ color: '#0066ff', wordBreak: 'break-all' as const }}>
          {verificationUrl}
        </a>
      </Text>

      <Text style={note}>
        Ссылка действительна в течение 24 часов. Если вы не регистрировались, просто проигнорируйте это письмо.
      </Text>
    </Section>
  </EmailLayout>
);

export default WelcomeEmail;
