import useSWR from 'swr';
import { Response } from '@/types/response';
import { MyCourses } from '@/types/schema';

export default function useMyCourses() {
  const { data: myCourses, isLoading } = useSWR<Response<MyCourses>>('learning/my-courses');

  return { myCourses, isLoading };
}