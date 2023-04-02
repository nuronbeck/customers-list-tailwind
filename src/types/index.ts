export type TUserStatus = 'user' | 'admin';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  status: TUserStatus;
  email: string;
  password: string;
}
