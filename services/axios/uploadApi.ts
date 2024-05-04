import axiosClient from ".";
import { Response } from '@/types/response';

export const uploadApi = {
  uploadFile: (body: any): Promise<Response> => axiosClient.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/raw/upload`, body),
  uploadImage: (body: any): Promise<Response> => axiosClient.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, body),
  uploadVideo: (body: any): Promise<Response> => axiosClient.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/video/upload`, body),
}