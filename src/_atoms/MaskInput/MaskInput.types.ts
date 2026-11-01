export interface IMaskInputTypes {
  label: string;
  mask: string;
  inputModeIsNumeric: 'numeric' | 'text';
  definitions: { [key: string]: string | RegExp };
  error?: boolean;
  helperText?: string;
}
