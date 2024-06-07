import useSWR from "swr";
import { Response } from "@/types/response";
import { LearnProgress } from "@/types/schema";

export default function useLearnProgress(slug: string) {
  const { data: learnProgress, isLoading } = useSWR<Response<LearnProgress>>(`/learning/${slug}`);

  return { learnProgress, isLoading };
}