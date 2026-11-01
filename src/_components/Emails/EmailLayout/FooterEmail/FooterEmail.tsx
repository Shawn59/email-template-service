import { Hr, Link, Section, Text } from 'react-email';

const footerSection = {
  padding: '24px 32px',
  backgroundColor: '#f9fafb',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '0 0 16px',
};

const text = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '4px 0',
  textAlign: 'center' as const,
  fontFamily: 'Arial, sans-serif',
};

const link = {
  color: '#6b7280',
  textDecoration: 'underline',
  marginLeft: '8px',
};

const socialRow = {
  textAlign: 'center' as const,
  marginBottom: '12px',
};

const socialLink = {
  color: '#0066ff',
  fontSize: '12px',
  textDecoration: 'none',
  margin: '0 8px',
  fontFamily: 'Arial, sans-serif',
};

export const FooterEmail = () => (
  <Section style={footerSection}>
    <Hr style={hr} />

    <div style={socialRow}>
      <Link href="https://t.me/example" style={socialLink}>
        Telegram
      </Link>
      <Link href="https://vk.com/example" style={socialLink}>
        ВКонтакте
      </Link>
      <Link href="https://example.com/support" style={socialLink}>
        Поддержка
      </Link>
    </div>

    <Text style={text}>ООО «Компания», ул. Примерная, 1, Москва, 101000</Text>
    <Text style={text}>
      Вы получили это письмо, потому что зарегистрировались на example.com.
      <Link href="https://example.com/unsubscribe" style={link}>
        Отписаться
      </Link>
    </Text>
    <Text style={text}>© {new Date().getFullYear()} Company. Все права защищены.</Text>
  </Section>
);
