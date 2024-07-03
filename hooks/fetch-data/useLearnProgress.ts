import useSWR from 'swr';
import { Response } from '@/types/response';
import { LearnProgress } from '@/types/schema';

export default function useLearnProgress(slug: string) {
  const { data: learnProgress, isLoading: learnLoading, mutate: learnProgressMutate } = useSWR<Response<LearnProgress>>(`/learning/course/${slug}`);

  return { learnProgress, learnLoading, learnProgressMutate };
}
