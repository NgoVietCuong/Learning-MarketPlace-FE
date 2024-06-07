import useSWR from 'swr';
import { Response } from '@/types/response';
import { LessonProgressDetails } from '@/types/schema';

export default function useLessonProgress(lessonId: number) {
  const { data: lessonProgress, isLoading: lessonLoading } = useSWR<Response<LessonProgressDetails>>(
    `/learning/lesson/${lessonId}`,
  );

  return { lessonProgress, lessonLoading };
}
