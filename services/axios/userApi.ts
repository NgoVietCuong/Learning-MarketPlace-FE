import { axiosClient } from '.';
import { ChangeAvatarBody, ChangePasswordBody } from '@/types/request';
import { Response } from '@/types/response';

export const userApi = {
  changeAvatar: (body: ChangeAvatarBody): Promise<Response> => axiosClient.patch('/user/change-avatar', body),
  changePassword: (body: ChangePasswordBody): Promise<Response> => axiosClient.patch('/user/change-password', body),
}