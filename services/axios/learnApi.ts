import { axiosClient } from ".";
import { Response } from "@/types/response";
import { EnrollCourseBody, UpdateProgressBody } from "@/types/request";

export const learnApi = {
  enrollCourse: (body: EnrollCourseBody): Promise<Response> => axiosClient.post('/learning/enrollment', body),
  updateProgress: (body: UpdateProgressBody): Promise<Response> => axiosClient.put('/learning/update-progress', body)
}