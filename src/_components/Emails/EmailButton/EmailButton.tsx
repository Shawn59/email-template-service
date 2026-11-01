import { Button } from 'react-email';

interface EmailButtonProps {
  href: string;
  children: string;
  variant?: 'primary' | 'secondary';
}

const primary = {
  backgroundColor: '#0066ff',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block' as const,
  padding: '12px 24px',
  borderRadius: '6px',
};

const secondary = {
  ...primary,
  backgroundColor: '#ffffff',
  color: '#0066ff',
  border: '1px solid #0066ff',
};

export const EmailButton = ({ href, children, variant = 'primary' }: EmailButtonProps) => (
  <Button href={href} style={variant === 'primary' ? primary : secondary}>
    {children}
  </Button>
);
