import Link from 'next/link';
import { useRouter } from 'next/router';
import { CircleUser, Settings } from 'lucide-react';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

export default function UserSideBar() {
  const router = useRouter();

  const isSelected = (path: string) => {
    const isRoot = path === '/';
    if (isRoot) {
      return router.pathname === path;
    } else {
      return router.pathname.includes(path);
    }
  };

  return (
    <div className="w-[300px] h-[100%] z-5 bg-white-primary shadow-lg rounded-xl">
      <div className="w-full h-full flex flex-col px-4 py-4 justify-between">
        <div className="flex flex-col gap-5">
          <div className="py-4 pr-3 bg-teal-secondary rounded-md flex items-center">
            <Img src="/images/img_logo_no_background.svg" alt="img_logo" className='w-[82px]' />
            <div>
              <Heading size="xl" as="h2" className="text-white-primary from-neutral-50 !font-medium">
                Welcome back!
              </Heading>
              <Text size="xs" as="p" className="text-white-primary">
                HoaLearn student
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href="/user/account-settings"
              className={`py-2 px-2 rounded-md inline-flex items-center hover:bg-slate-100 ${isSelected('/user/account-settings') ? '!bg-slate-200' : 'bg-white-primary'}`}
            >
              <Text
                size="sm"
                as="p"
                className={`${isSelected('/user/account-settings') ? 'text-gray-800' : '!text-gray-700'} inline-flex items-center font-medium`}
              >
                <Settings className="mr-5 h-5 w-5" />
                Account settings
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
