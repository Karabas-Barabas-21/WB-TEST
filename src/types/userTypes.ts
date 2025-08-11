export interface IUser {
  id: string;
  name: string;
  avatar: string;
  city: string;
  createdAt: string;
}

export interface UsersState {
  users: IUser[];
  loading: boolean;
  error: string | null;
  currentUser: IUser | null;
}