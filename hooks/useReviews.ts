import useSWR from 'swr';
import { Response } from '@/types/response';
import { ReviewList } from '@/types/schema';

export default function useReviews(slug: string) {
  const { data: reviewList, isLoading: reviewLoading } = useSWR<Response<ReviewList>>(`/review/list?slug=${slug}`);

  return { reviewList, reviewLoading };
}
