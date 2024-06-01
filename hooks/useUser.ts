import useSWR from 'swr';
import { User } from '@/types/schema';
import { Response } from '@/types/response';

export default function useUser() {
  const { data: user, isLoading, mutate: userMutate, error } = useSWR<Response<User>>('/user');
  
  const getUserRoles = () => {
    if (!user || !user.data) return [];
    return user.data!.roles.map((role) => role.code);
  }

  const hasRole = (role: string) => {
    if (!user || !user.data) return false;  
    return getUserRoles().includes(role);
  }

  return { user, isLoading, userMutate, hasRole };
};
