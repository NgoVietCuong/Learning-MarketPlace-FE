import useSWR from 'swr';

export default function useUser() {
  const { data } = useSWR('/user');

  let userData;
  if (data.statusCode === 200) {
    userData = data.data;
  } else {
    userData = null;
  }

  return {
    userData,
  }
};
