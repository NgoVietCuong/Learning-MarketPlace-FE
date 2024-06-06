import useSWR from 'swr';
import { Response } from '@/types/response';
import { CourseSlugInfo } from '@/types/schema';

export default function useCourseSlug(slug: string) {
  const { data: courseSlugInfo, isLoading: courseSlugLoading  } = useSWR<Response<CourseSlugInfo>>(`/course/${slug}`);

  return { courseSlugInfo, courseSlugLoading };
}
