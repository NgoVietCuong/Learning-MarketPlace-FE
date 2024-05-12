// auth body request
export interface LoginBody {
  email: string;
  password: string;
}

export interface GoogleLoginBody {
  idToken: string;
}

export interface VerifyCodeBody {
  email: string;
  code: string;
}

export interface SendVerifyEmailBody {
  email: string;
}

export interface SendResetEmailBody {
  email: string;
  url: string;
}

export interface RefreshTokenBody {
  refreshToken: string;
}

export interface SignUpBody extends LoginBody {
  username: string;
}

export interface UpdatePasswordBody extends VerifyCodeBody {
  password: string;
}

// user body request
export interface ChangePasswordBody {
  currentPassword: string;
  newPassword: string;
}

export interface ChangeAvatarBody {
  avatar: string;
}


// instructor body request
export interface ChangeInstructorPictureBody {
  picture: string;
}

export interface ChangeInstructorProfileBody {
  displayName: string;
  introduction: string;
  biography: string;
  twitterLink?: string | null;
  linkedinLink?: string | null;
  youtubeLink?: string | null;
}