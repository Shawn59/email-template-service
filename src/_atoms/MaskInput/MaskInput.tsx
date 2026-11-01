import * as React from 'react';
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { FC } from 'react';
import type { IMaskInputTypes } from './MaskInput.types';
import { FormHelperText } from '@mui/material';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export const MaskInput: FC<IMaskInputTypes> = ({
  label,
  mask,
  definitions,
  error,
  helperText,
  inputModeIsNumeric,
  ...rest
}) => {
  return (
    <FormControl variant="standard" error={error}>
      <InputLabel>{label}</InputLabel>

      <Input
        inputComponent={TextMaskCustom as any}
        inputProps={{
          mask: mask,
          definitions: definitions,
          inputMode: inputModeIsNumeric ? 'numeric' : 'text',
        }}
        {...rest}
      />

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
