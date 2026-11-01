import type { IUserModel } from '../../types/user';

export interface IAvatarTypes {
  img?: string;
  status?: IUserModel['status'];
  onClick?: () => void;
  className?: string;
  size?: 'big' | 'middle';
}
