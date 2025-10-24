export interface LoginRequest {
  email: string;
  password: string;
}

export interface Module {
  name: string;
  route: string;
  icon?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  modules?: Module[];
  [key: string]: any;
}

export interface LoginResponse {
  token: string;
  user?: User;
  modules?: Module[];
  message?: string;
  [key: string]: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
