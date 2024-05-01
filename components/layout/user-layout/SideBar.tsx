import Link from 'next/link';
import { useRouter } from 'next/router';
import { CircleUser, Settings } from 'lucide-react';
import { Text } from '@/components/ui/text';

export default function UserSideBar() {
  const router = useRouter();

  const isSelected = (path: string) => {
    const isRoot = path === '/';
    if (isRoot) {
      return router.pathname === path;
    } else {
      return router.pathname.includes(path);
    } 
  }

  return (
    <div className="w-[300px] h-[100%] z-5 bg-white-primary shadow-lg rounded-lg">
      <div className="w-full h-full flex flex-col px-4 py-3 justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <Link href="/user/edit-account" className={`py-2 px-2 rounded-md hover:bg-slate-200 ${isSelected('/user/edit-account') ? '!bg-teal-secondary': 'bg-white-primary'}`}>
              <Text size="s" as="p" className={`${isSelected('/user/edit-account') ? 'text-white-primary': 'text-gray-700'} inline-flex items-center`}>
                <Settings className="mr-5 h-5 w-5" />
                Account
              </Text>
            </Link>

            <Link href="/user/edit-photo" className={`py-2 px-2 rounded-md hover:bg-slate-200 ${isSelected('/user/edit-photo') ? '!bg-teal-primary': 'bg-white-primary'}`}>
              <Text size="s" as="p" className={`${isSelected('/user/edit-photo') ? 'text-white-primary': 'text-gray-700'} inline-flex items-center`}>
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
