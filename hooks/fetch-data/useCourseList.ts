import useSWR from 'swr';
import { Response } from '@/types/response';
import { CourseList } from '@/types/schema';

export default function useCourseList(
  page: string | null,
  type: string | null,
  status: string | null,
  search: string | null,
  categoryId: string | null,
) {
  const {
    data: courseList,
    isLoading,
    mutate: courseListMutate,
  } = useSWR<Response<CourseList>>(
    `/instructor/course/list?${page ? `page=${page}` : ''}${type ? `&type=${type}` : ''}${status ? `&status=${status}` : ''}${categoryId ? `&categoryId=${categoryId}` : ''}${search ? `&search=${search}` : ''}`,
  );

  return { courseList, isLoading, courseListMutate };
}
