import { LessonContentTypes } from "@/constants/enums";

// auth body request
export type LoginBody = {
  email: string;
  password: string;
}

export type GoogleLoginBody ={
  idToken: string;
}

export type VerifyCodeBody = {
  email: string;
  code: string;
}

export type SendVerifyEmailBody = {
  email: string;
}

export type SendResetEmailBody = {
  email: string;
  url: string;
}

export type RefreshTokenBody = {
  refreshToken: string;
}

export type SignUpBody = LoginBody & {
  username: string;
}

export type UpdatePasswordBody = VerifyCodeBody & {
  password: string;
}

// user body request
export type ChangePasswordBody = {
  currentPassword: string;
  newPassword: string;
}

export type ChangeAvatarBody=  {
  avatar: string;
}


// instructor body request
export type ChangeInstructorPictureBody = {
  picture: string;
}

export type ChangeInstructorProfileBody = {
  displayName: string;
  introduction: string;
  biography: string;
  twitterLink?: string | null;
  linkedinLink?: string | null;
  youtubeLink?: string | null;
}


// instructor course body request
export type CreateCourseBody = {
  title: string;
  categoryIds: number[];
}

export type UpdateCourseBody = CreateCourseBody & {
  overview: string;
  description: string;
  price: number;
  level: string;
  imagePreview: string;
  videoPreview?: string | null;
}

export type UpdatePublishBody = {
  isPublished: boolean;
}

export type CreateSectionBody = {
  title: string;
  courseId: number;
}

export type UpdateSectionBody = Partial<CreateSectionBody>;

export type CreateLessonBody = {
  title: string;
  sectionId: number;
}

export type UpdateLessonBody = CreateLessonBody & {
  contentType: LessonContentTypes;
  content: string;
  fileName: string | null;
  duration: number | null;
};


// learn body request
export type EnrollCourseBody = {
  courseId: number;
}

export type UpdateProgressBody = {
  enrollmentId: number;
  lessonId: number;
  contentProgress: number;
}


// course review body request
export type CreateReviewBody = {
  enrollmentId: number;
  rating: number;
  comment: number;
}

export type UpdateReviewBody = Partial<CreateReviewBody>;


// admin body request
export type ChangeUserStatusBody = {
  isActive: boolean;
}


// payment body request
export type OnboardMerchantBody = {
  paypalEmail: string;
}

export type ExecutePaymentBody = {
  orderId: string;
}