import styles from './Avatar.module.scss';
import type { IAvatarTypes } from './Avatar.types';
import { FC } from 'react';
import classNames from 'classnames';

export const AvatarAtom: FC<IAvatarTypes> = ({ size = 'middle', img, status = 0, onClick, className }) => {
  return (
    <div className={styles.avatarContainer}>
      <div
        className={classNames(styles.avatar, onClick && styles.cursor, styles[size], className as any)}
        onClick={onClick}
      >
        <img
          src={img ?? '/chat/avatar-template.svg'}
          className={classNames(styles.avatarImg, !img && styles.template)}
          alt={'аватар'}
        />
      </div>
      {!!status && <div className={styles.status} />}
    </div>
  );
};
