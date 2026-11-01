import { ButtonProps } from '@mui/material';

export interface IButtonTypes extends ButtonProps {
  label?: string;
  customTheme?: 'Orange';
  customSize?: 'Small';
}
