export interface ISnackbarState {
  id?: string;
  open?: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}
