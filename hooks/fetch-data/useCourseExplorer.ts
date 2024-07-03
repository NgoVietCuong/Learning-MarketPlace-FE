import useSWR from 'swr';
import { Response } from '@/types/response';
import { CourseExplorerList } from '@/types/schema';

export default function useCourseExplorerList(
  search: string | null,
  categoryId: string | null,
  level: string | null,
  price: string | null,
  page: string | null,
) {
  const { data: courseExplorerList, isLoading } = useSWR<Response<CourseExplorerList>>(
    `course/list?${search ? `search=${search}` : ''}${categoryId ? `&categoryId=${categoryId}` : ''}${level ? `&level=${level}` : ''}${price ? `&price=${price}` : ''}${page ? `&page=${page}` : ''}`,
  );

  return { courseExplorerList, isLoading };
}
