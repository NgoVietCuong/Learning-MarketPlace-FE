import axiosClient from '.';
import {
  LoginBody,
  SignUpBody,
  GoogleLoginBody,
  VerifyCodeBody,
  SendVerifyEmailBody,
  SendResetEmailBody,
  RefreshTokenBody,
  UpdatePasswordBody,
} from '@/types/request';
import { Response } from '@/types/response';
import { Token, Login, Verify } from '@/types/schema';

export const authApi = {
  logout: (): Promise<Response> => axiosClient.post('/auth/logout'),
  login: (body: LoginBody): Promise<Response<Login>> => axiosClient.post('/auth/login', body),
  signUp: (body: SignUpBody): Promise<Response> => axiosClient.post('/auth/sign-up', body),
  googleLogin: (body: GoogleLoginBody): Promise<Response<Login>> => axiosClient.post('/auth/google-login', body),
  verifySignUp: (body: VerifyCodeBody): Promise<Response> => axiosClient.post('/auth/verify-signup', body),
  refreshToken: (body: RefreshTokenBody): Promise<Response<Token>> => axiosClient.post('/auth/refresh-token', body),
  updatePassword: (body: UpdatePasswordBody): Promise<Response> => axiosClient.post('/auth/update-password', body),
  sendResetEmail: (body: SendResetEmailBody): Promise<Response> => axiosClient.post('/auth/send-reset-email', body),
  resendVerifyEmail: (body: SendVerifyEmailBody): Promise<Response> =>
    axiosClient.post('/auth/resend-verify-email', body),
  verifyResetPassword: (body: VerifyCodeBody): Promise<Response<Verify>> =>
    axiosClient.post('/auth/verify-reset-password', body),
};
