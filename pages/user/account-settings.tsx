import { IoMailOutline } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { GoShieldLock } from 'react-icons/go';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AccountSkeleton from '@/components/skeleton/AccountSkeleton';
import UserLayout from '@/components/layout/user-layout';
import ChangePhoto from '@/components/modal/ChangePhoto';
import ChangePassword from '@/components/modal/ChangePassword';
import useUser from '@/hooks/useUser';
import { userApi } from '@/services/axios/userApi';

export default function AccountSettings() {
  const { user, isLoading, userMutate } = useUser();

  return (
    <div className="grow bg-white-primary shadow-lg rounded-xl">
      <div className="w-full py-6 px-6 flex flex-col gap-6">
        {isLoading ? (
          <AccountSkeleton />
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11">
              <AvatarImage src={user?.data?.avatar ? user.data.avatar : undefined} />
              <AvatarFallback className="bg-teal-secondary text-white-primary text-center font-medium text-sm">
                {user?.data?.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <Heading size="xl" className="!font-medium !text-gray-700">
                My account
              </Heading>
              <Text size="xs" as="p" className="text-gray-700">
                {user?.data?.email}
              </Text>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-4 py-4 rounded-xl border-dashed border-2 border-slate-300">
            <div className="flex items-center gap-4">
              <IoMailOutline className="w-8 h-8 font-medium text-teal-secondary" />
              <div>
                <Heading size="xl" className="!font-medium !text-gray-700">
                  Email
                </Heading>
                <Text size="sm" as="p" className="text-gray-700">
                  Current Email: <span className="font-medium">{user?.data?.email}</span>
                </Text>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-5 rounded-xl bg-slate-100">
            <div className="flex items-center gap-4">
              <RxAvatar className="w-8 h-8 font-medium text-teal-secondary" />
              <div>
                <Heading size="xl" className="!font-medium !text-gray-700">
                  Avatar
                </Heading>
                <Text size="sm" as="p" className="text-gray-700">
                  Personalize your account by uploading a new avatar image
                </Text>
              </div>
            </div>
            <ChangePhoto
              title={'Change Avatar'}
              field={'avatar'}
              object={user}
              isLoading={isLoading}
              mutate={userMutate}
              apiHandler={userApi.changeAvatar}
            />
          </div>

          <div className="flex items-center justify-between px-4 py-5 rounded-xl bg-slate-100 ">
            <div className="flex items-center gap-4">
              <GoShieldLock className="w-8 h-8 font-medium text-teal-secondary" />
              <div>
                <Heading size="xl" className="!font-medium !text-gray-700">
                  Password
                </Heading>
                <Text size="sm" as="p" className="text-gray-700">
                  If you change your password, you will get logged out on all other devices, including all browsers
                  except this one.
                </Text>
              </div>
            </div>
            <ChangePassword userMutate={userMutate} />
          </div>
        </div>
      </div>
    </div>
  );
}

AccountSettings.getLayout = function (page: React.ReactNode) {
  return <UserLayout>{page}</UserLayout>;
};
