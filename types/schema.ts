import { IconNames } from './common';
import { LessonContentTypes } from '../constants/enums';

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
};

export type InstructorSlugInfo = InstructorProfile & {
  totalStudents: number;
  totalReviews: number;
  averageRating: number;
  courses: (Omit<Course, 'categories>'> & {
    totalVideoDuration: string;
    totalArticles: number;
    totalReviews: number;
    averageRating: number;
  })[];
}

// category schema
export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: IconNames;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CategoryList = Category[];

export type CreateData = {
  id: number;
};

// instructor course api schema
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
  categories: CategoryList;
};

export type Meta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type CourseList = {
  items: Course[];
  meta: Meta;
};

export type Lesson = {
  id: number;
  sectionId: number;
  title: string;
  contentType: LessonContentTypes;
  content: string | null;
  fileName: string | null;
  duration: number | null;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Section = {
  id: number;
  courseId: number;
  title: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
};

export type CourseDetails = Course & {
  sections: Section[];
};

// course review api schema
export type Review = {
  id: number;
  enrollment: {
    id: number;
    user: Pick<User, 'username' | 'avatar'>;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewList = {
  items: Review[];
  meta: Meta;
};

// course api schema
export type CourseSlugInfo = Course & {
  profile: InstructorProfile;
  sections: (Omit<Section, 'lessons'> & {
    lessons: Pick<Lesson, 'id' | 'title' | 'contentType' | 'duration'>[];
  })[];
  hasEnrolled: boolean;
  totalStudents: number;
  totalReviews: number;
  averageRating: number;
  totalVideoDuration: string;
  totalArticles: number;
  numberEachRatings: {
    rate: number;
    count: number;
  }[];
  currentLesson: {
    id: number;
  };
};

// learn api schema
export type MyCourse = {
  id: number;
  userId: number;
  courseId: number;
  progressStatus: number;
  createdAt: string;
  updatedAt: string;
  course: (Omit<Course, 'instructorId'> & {
    profile: {
      displayName: string;
    }
  });
  review: Review | null;
};

export type MyCourses = {
  inProgressCourses: MyCourse[];
  completedCourses: MyCourse[];
}

export type LessonProgress = {
  id: number;
  enrollmentId: number;
  lessonId: number;
  isCompleted: boolean;
  contentProgress: number;
  createdAt: string;
  updatedAt: string;
};

export type LessonProgressDetails = Lesson & {
  lessonProgress: LessonProgress | null;
};

export type LearnProgress = {
  id: number;
  userId: number;
  courseId: number;
  progressStatus: number;
  course: Course & {
    sections: (Omit<Section, 'lessons'> & {
      lessons: LessonProgressDetails[];
    })[];
  };
  review: Review | null;
  createdAt: string;
  updatedAt: string;
};
