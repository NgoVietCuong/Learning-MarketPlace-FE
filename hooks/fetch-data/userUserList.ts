import useSWR from 'swr';
import { Response } from '@/types/response';
import { UserList } from '@/types/schema';

export default function useUserList(
  page: string | null,
  search: string | null,
  isActive: string | null,
  role: string | null,
) {
  const {
    data: userList,
    isLoading,
    mutate: userListMutate,
  } = useSWR<Response<UserList>>(`/admin/user/list?${page ? `page=${page}` : ''}${search ? `&search=${search}` : ''}${isActive ? `&isActive=${isActive}` : ''}${role ? `&role=${role}` : ''}`);

  return { userList, isLoading, userListMutate };
}
