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

export const authApi = {
  logout: (): Promise<Response> => axiosClient.post('/auth/logout'),
  login: (body: LoginBody): Promise<Response> => axiosClient.post('/auth/login', body),
  signUp: (body: SignUpBody): Promise<Response> => axiosClient.post('/auth/sign-up', body),
  googleLogin: (body: GoogleLoginBody): Promise<Response> => axiosClient.post('/auth/google-login', body),
  verifySignUp: (body: VerifyCodeBody): Promise<Response> => axiosClient.post('/auth/verify-signup', body),
  refreshToken: (body: RefreshTokenBody): Promise<Response> => axiosClient.post('/auth/refresh-token', body),
  uploadPassword: (body: UpdatePasswordBody): Promise<Response> => axiosClient.post('/auth/update-password', body),
  sendResetEmail: (body: SendResetEmailBody): Promise<Response> => axiosClient.post('/auth/send-reset-email', body),
  resendVerifyEmail: (body: SendVerifyEmailBody): Promise<Response> => axiosClient.post('/auth/resend-verify-email', body),
  verifyResetPassword: (body: VerifyCodeBody): Promise<Response> => axiosClient.post('/auth/verify-reset-password', body),
};