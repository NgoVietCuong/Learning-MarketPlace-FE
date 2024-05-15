// auth api schema
export type Token = {
  accessToken: string;
};

export type Login = {
  accessToken: string;
  refreshToken: string;
};

export type Verify = {
  isValid: boolean | null;
};

// user api schema
export type Role = {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
};

// instructor api schema
export type InstructorProfile = {
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
};

// category schema
export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// instructor course api schema
export type CreateData = {
  id: number;
};

export type Course = {
  id: number;
  instructorId: number;
  title: string;
  slug: string;
  level: string | null;
  imagePreview: string | null;
  videoPreview: string | null;
  overview: string | null;
  description: string | null;
  isPublished: boolean;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
};

export type CourseList = {
  items: Course[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};
