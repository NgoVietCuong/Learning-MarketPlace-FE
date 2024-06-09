import { axiosClient } from '.';
import {
  CreateCourseBody,
  UpdateCourseBody,
  UpdatePublishBody,
  CreateSectionBody,
  UpdateSectionBody,
  CreateLessonBody,
  UpdateLessonBody,
} from '@/types/request';
import { Response } from '@/types/response';
import { CreateData } from '@/types/schema';

export const instructorCourseApi = {
  // lesson
  createCourse: (body: CreateCourseBody): Promise<Response<CreateData>> => axiosClient.post('/instructor/course', body),
  updateCourse: (courseId: number, body: UpdateCourseBody): Promise<Response> => axiosClient.patch(`/instructor/course/${courseId}`, body),
  updatePublishCourse: (courseId: number, body: UpdatePublishBody): Promise<Response> => axiosClient.patch(`/instructor/course/${courseId}/publish`, body),
  deleteCourse: (courseId: number): Promise<Response> => axiosClient.delete(`/instructor/course/${courseId}`),
  // section
  createSection: (body: CreateSectionBody): Promise<Response<CreateData>> => axiosClient.post('/instructor/course/section', body),
  updateSection: (sectionId: number, body: UpdateSectionBody): Promise<Response> => axiosClient.patch(`/instructor/course/section/${sectionId}`, body),
  deleteSection: (sectionId: number): Promise<Response> => axiosClient.delete(`/instructor/course/section/${sectionId}`),
  // lesson
  createLesson: (body: CreateLessonBody): Promise<Response<CreateData>> => axiosClient.post('/instructor/course/lesson', body),
  updateLesson: (lessonId: number, body: UpdateLessonBody): Promise<Response> => axiosClient.patch(`/instructor/course/lesson/${lessonId}`, body),
  updatePublishLesson: (lessonId: number, body: UpdatePublishBody): Promise<Response> => axiosClient.patch(`/instructor/course/lesson/${lessonId}/publish`, body),
  deleteLesson: (lessonId: number): Promise<Response> => axiosClient.delete(`/instructor/course/lesson/${lessonId}`),
}