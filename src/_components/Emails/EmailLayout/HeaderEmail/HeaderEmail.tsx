import { Img, Link, Row, Column, Section } from 'react-email';

const headerSection = {
  padding: '24px 32px',
  borderBottom: '1px solid #e5e7eb',
  backgroundColor: '#ffffff',
};

const logoCell = { width: '50%', verticalAlign: 'middle' as const };
const navCell = { width: '50%', textAlign: 'right' as const, verticalAlign: 'middle' as const };

const logo = {
  display: 'block',
  maxWidth: '120px',
  height: 'auto',
};

const navLink = {
  color: '#0066ff',
  fontSize: '14px',
  textDecoration: 'none',
  marginLeft: '16px',
  fontFamily: 'Arial, sans-serif',
};

export const HeaderEmail = () => (
  <Section style={headerSection}>
    <Row>
      <Column style={logoCell}>
        <Link href="https://example.com">
          <Img src="https://example.com/logo.png" alt="Company" width="120" style={logo} />
        </Link>
      </Column>
      <Column style={navCell}>
        <Link href="https://example.com/account" style={navLink}>
          Аккаунт
        </Link>
        <Link href="https://example.com/help" style={navLink}>
          Помощь
        </Link>
      </Column>
    </Row>
  </Section>
);
