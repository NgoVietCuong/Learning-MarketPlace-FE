import { axiosClient } from ".";
import { ChangeInstructorPictureBody, ChangeInstructorProfileBody } from "@/types/request";
import { Response } from "@/types/response";

export const instructorApi = { 
  changePicture: (body: ChangeInstructorPictureBody): Promise<Response> => axiosClient.patch('/instructor/profile/change-picture', body),
  changeProfile: (body: ChangeInstructorProfileBody): Promise<Response> => axiosClient.patch('/instructor/profile/change-information', body),
}