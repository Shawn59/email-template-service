export interface IUserModel {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  status?: 1 | 0;
  avatarImg?: string;
  phone?: string;
  email?: string;
}
