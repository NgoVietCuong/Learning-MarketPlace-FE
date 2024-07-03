import useSWR from 'swr';
import { Response } from '@/types/response';
import { Lesson } from '@/types/schema';

export default function useLessonDetails(id: number) {
  const { data: lessonDetails, isLoading, mutate: lessonDetailsMutate } = useSWR<Response<Lesson>>(`/instructor/course/lesson/${id}`);

  return { lessonDetails, isLoading, lessonDetailsMutate };
}
