import useSWR from 'swr';
import { Response } from '@/types/response';
import { ReviewList } from '@/types/schema';

export default function useReviews(slug: string, rating?: number) {
  const { data: reviewList, isValidating: reviewListValidating } = useSWR<Response<ReviewList>>(`/review/list?slug=${slug}${rating ? `&rating=${rating}` : ''}`);

  return { reviewList, reviewListValidating };
}
