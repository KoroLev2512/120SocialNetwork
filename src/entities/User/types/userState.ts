export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  id: number;
  wallet: number;
  telegram_id: number;
  username: string;
  first_name: string;
  second_name: string;
  tg: string;
  picture: string;
  roles: {
    id: number;
    value: ROLES;
    description: string;
  }[];
  time_registration: number;
  language: string;
};

export type UserStore = {
  user: User | null;
  getUser: () => void;
  isLoading: boolean;
  error: null | string | Record<string, unknown>;
  editUser: (data: User) => void;
};
