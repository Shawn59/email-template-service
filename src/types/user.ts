export interface IUserModel {
  id: string;
  login: string;
  firstName?: string;
  lastName?: string;
  profession?: string;
  status?: 1 | 0;
  avatarImg?: string;
  phone?: string;
  email?: string;
}
