import React, { FC } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import styles from './SearchInput.module.scss';
import type { ISearchInputAtom } from './SearchInput.types';
import classNames from 'classnames';

export const SearchInputAtom: FC<ISearchInputAtom> = ({ placeholder = 'Поиск...', className, onChange, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('');
  };

  return (
    <TextField
      placeholder={placeholder}
      className={classNames(styles.searchInputContainer, className as any)}
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value ? (
              <IconButton size="small" onClick={handleClear} className={styles.close}>
                <img src={'/close.svg'} />
              </IconButton>
            ) : (
              <img src={'/loop.svg'} className={styles.loop} />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};
