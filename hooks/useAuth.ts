import useSWR from 'swr';

export default function useAuth() {
  const { data: user, error } = useSWR('/user');

  const firstLoading = user === undefined && error === undefined;

  return {
    user,
    error,
    firstLoading
  }
};
