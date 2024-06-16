import useSWR from 'swr';
import { Response } from '@/types/response';
import { UserList } from '@/types/schema';

export default function useUserList() {
  const { data: userList, isLoading, mutate: userListMutate } = useSWR<Response<UserList>>('/admin/user/list');

  return { userList, isLoading, userListMutate };
}
