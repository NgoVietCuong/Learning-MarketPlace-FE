import useSWR from 'swr';
import { User } from '@/types/schema';
import { Response } from '@/types/response';

export default function useUser() {
  const { data: user, isLoading, mutate: userMutate } = useSWR<Response<User>>('/user');
  return { user, isLoading, userMutate };
};
