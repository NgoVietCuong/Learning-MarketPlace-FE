import useSWR from 'swr';
import { Response } from '@/types/response';
import { InstructorProfile } from '@/types/schema';

export default function useProfile() {
  const {
    data: profile,
    isLoading,
    mutate: profileMutate,
  } = useSWR<Response<InstructorProfile>>('/instructor/profile');

  return { profile, isLoading, profileMutate };
}
