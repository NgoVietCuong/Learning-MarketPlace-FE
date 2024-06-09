import useSWR from 'swr';
import { Response } from '@/types/response';
import { CourseList } from '@/types/schema';

export default function useCourseList() {
  const {
    data: courseList,
    isLoading,
    mutate: courseListMutate,
  } = useSWR<Response<CourseList>>('/instructor/course/list');

  return { courseList, isLoading, courseListMutate };
}
