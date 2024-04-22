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
