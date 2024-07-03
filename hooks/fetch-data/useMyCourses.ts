import useSWR from 'swr';
import { Response } from '@/types/response';
import { MyCourses } from '@/types/schema';

export default function useMyCourses() {
  const { data: myCourses, isLoading: myCoursesLoading, mutate: myCoursesMutate } = useSWR<Response<MyCourses>>('learning/my-courses');

  return { myCourses, myCoursesLoading, myCoursesMutate };
}