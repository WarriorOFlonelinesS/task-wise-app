export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
}
