import type { IUserModel } from '../../types/user';

export interface IUserProfileModalState {
  isOpen: boolean;
  userData: IUserModel | null;
}
