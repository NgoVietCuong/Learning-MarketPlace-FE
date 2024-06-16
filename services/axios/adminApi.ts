import { axiosClient } from '.';
import { ChangeUserStatusBody } from '@/types/request';
import { Response } from '@/types/response';

export const adminApi = {
  changeUserStatus: (userId: number, body: ChangeUserStatusBody): Promise<Response> => axiosClient.patch(`/admin/users/${userId}/status`, body)
}