export interface AuthUser {
  name: string;
  phone: string;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
