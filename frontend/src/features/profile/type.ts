import { User } from '../auth/type';

export interface ProfileState {
  profile: Profile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string;
}

export interface Profile extends User {
  avatar_url: string;
}
