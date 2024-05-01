import Link from 'next/link';
import { useRouter } from 'next/router';
import { CircleUser, Settings } from 'lucide-react';
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
    <div className="w-[280px] h-[100%] z-5 bg-white-primary shadow-lg rounded-lg">
      <div className="w-full h-full flex flex-col px-4 py-3 justify-between">
        <div className="flex flex-col gap-5">
          <div className="py-4 px-3 bg-teal-secondary rounded-md flex gap-2">
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
              href="/user/edit-account"
              className={`py-2 px-2 rounded-md inline-flex items-center hover:bg-slate-100 ${isSelected('/user/edit-account') ? '!bg-slate-200' : 'bg-white-primary'}`}
            >
              <Text
                size="sm"
                as="p"
                className={`${isSelected('/user/edit-account') ? 'text-gray-800' : 'text-gray-700'} inline-flex items-center font-medium`}
              >
                <Settings className="mr-5 h-5 w-5" />
                Account
              </Text>
            </Link>

            <Link
              href="/user/edit-photo"
              className={`py-2 px-2 rounded-md inline-flex items-center hover:bg-slate-100 ${isSelected('/user/edit-photo') ? '!bg-slate-200' : 'bg-white-primary'}`}
            >
              <Text
                size="sm"
                as="p"
                className={`${isSelected('/user/edit-photo') ? 'text-gray-800' : 'text-gray-700'} inline-flex items-center font-medium`}
              >
                <CircleUser className="mr-5 h-5 w-5" />
                Photo
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
