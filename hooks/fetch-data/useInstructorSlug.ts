import useSWR from "swr";
import { Response } from "@/types/response";
import { InstructorSlugInfo } from "@/types/schema";

export default function useInstructorSlug(slug: string) {
  const { data: instructorSlugInfo, isLoading: instructorSlugLoading } = useSWR<Response<InstructorSlugInfo>>(`/instructor/profile/${slug}`);

  return { instructorSlugInfo, instructorSlugLoading };
}