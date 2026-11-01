import { Button } from '@mui/material';
import { FC } from 'react';
import type { IButtonTypes } from './Button.types';
import styles from './Button.module.scss';
import classNames from 'classnames';

export const ButtonAtom: FC<IButtonTypes> = ({ label = '', customTheme = '', customSize = '', ...rest }) => {
  return (
    <Button className={classNames(styles.button, styles[customTheme], styles[customSize])} {...rest}>
      {label}
    </Button>
  );
};
