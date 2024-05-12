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
export interface Role {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
}

// instructor api schema
export interface InstructorProfile {
  id: number;
  userId: number;
  slug: string | null;
  displayName: string | null;
  picture: string | null;
  introduction: string | null;
  biography: string | null;
  twitterLink: string | null;
  linkedinLink: string | null;
  youtubeLink: string | null;
  createdAt: string;
  updatedAt: string;
  [key: string]: string | number | null;
}