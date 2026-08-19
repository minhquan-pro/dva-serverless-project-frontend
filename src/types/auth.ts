export interface AuthUser {
  name: string;
  email: string;
  avatarUrl: string | null;
  phone: string;
  address: string;
}

export interface ProfileUpdate {
  phone: string;
  address: string;
}
