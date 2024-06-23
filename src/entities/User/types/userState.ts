export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  first_name: string;
  id: number;
  language: string;
  profile_photo: string;
  second_name: string;
  telegram_id: string;
  username: string;
  wallet: string;
}

export type UserStore = {
  user: User | null;
  error: string | null;
}

