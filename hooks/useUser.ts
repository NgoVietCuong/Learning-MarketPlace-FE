import useSWR from 'swr';

export default function useUser() {
  const { data: user, isLoading } = useSWR('/user');
  console.log('user', user)

  const firstLoading = user === undefined;
  return { user, isLoading };
  // console.log('statusCode', data.statusCode)

  // let userData;
  // if (data.statusCode === 200) {
  //   userData = data.data;
  // } else {
  //   userData = null;
  // }

  // return {
  //   userData,
  // }
};
