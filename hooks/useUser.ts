import useSWR from 'swr';

export default function useUser() {
  const { data: user, isLoading, mutate: userMutate } = useSWR('/user');
  return { user, isLoading, userMutate };
};
