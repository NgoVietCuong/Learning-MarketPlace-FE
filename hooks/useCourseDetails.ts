import useSWR from "swr";
import { Response } from "@/types/response";
import { CourseDetails } from "@/types/schema";

export default function useCourseDetails(id: number) {
  const { data: courseDetails, isLoading, mutate: courseDetailsMutate } = useSWR<Response<CourseDetails>>(`/instructor/course/${id}`);

  return { courseDetails, isLoading, courseDetailsMutate };
}