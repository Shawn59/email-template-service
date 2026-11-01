import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import type { IMenuAtom } from './Menu.types';

export const MenuAtom: FC<IMenuAtom> = ({ elem, data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>{elem}</IconButton>

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {data.map((item) => {
          const { onClick, label, id } = item;

          return (
            <MenuItem key={id} onClick={onClick}>
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
