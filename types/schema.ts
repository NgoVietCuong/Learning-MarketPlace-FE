// auth api schema
export interface Token {
  accessToken: string;
}

export interface Login {
  accessToken: string;
  refreshToken: string;
}

export interface Verify {
  isValid: boolean | null;
}

// user api schema
export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
