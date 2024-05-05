import useSWR from 'swr';
import { User } from '@/types/schema';
import { Response } from '@/types/response';

export default function useUser() {
  const { data: user, isLoading, mutate: userMutate } = useSWR<Response<User>>('/user');
  
  const getUserRoles = () => {
    if (!user) return [];
    return user.data!.roles.map((role) => role.code);
  }

  const hasRole = (role: string) => {
    if (!user) return false;  
    return getUserRoles().includes(role);
  }

  return { user, isLoading, userMutate, hasRole };
};
