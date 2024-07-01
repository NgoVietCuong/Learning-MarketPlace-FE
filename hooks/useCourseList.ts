import useSWR from 'swr';
import { Response } from '@/types/response';
import { CourseList } from '@/types/schema';

export default function useCourseList(page: string | null) {
  const {
    data: courseList,
    isLoading,
    mutate: courseListMutate,
  } = useSWR<Response<CourseList>>(`/instructor/course/list?${page ? `page=${page}` : ''}`);

  return { courseList, isLoading, courseListMutate };
}
