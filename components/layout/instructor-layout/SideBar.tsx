import Link from 'next/link';
import { useRouter } from 'next/router';
import { BookCopy, Gauge, Settings, FilePenLine } from 'lucide-react';
import { Text } from '@/components/ui/text';

export default function InstructorSideBar() {
  const router = useRouter();

  const isSelected = (path: string) => {
    const isRoot = path === '/instructor';
    if (isRoot) {
      return router.pathname === path;
    } else {
      return router.pathname.includes(path);
    }
  };

  return (
    <div className="w-[260px] h-[100%] z-5 bg-white-primary shadow-lg">
      <div className="w-full h-full flex flex-col px-4 py-4 justify-between">
        <div className="flex flex-col gap-1">
          <Link
            href="/instructor"
            className={`py-2 px-2 rounded-md inline-flex items-center hover:bg-slate-100 ${isSelected('/instructor') ? '!bg-teal-secondary' : 'bg-white-primary'}`}
          >
            <Text
              size="sm"
              as="p"
              className={`${isSelected('/instructor') ? '!text-white-primary' : 'text-gray-700'} inline-flex items-center font-medium`}
            >
              <Gauge className="mr-5 h-5 w-5" />
              Dashboard
            </Text>
          </Link>
          <Link
            href="/instructor/courses"
            className={`py-2 px-2 rounded-md inline-flex items-center hover:bg-slate-100 ${isSelected('/instructor/courses') ? '!bg-teal-secondary' : 'bg-white-primary'}`}
          >
            <Text
              size="sm"
              as="p"
              className={`${isSelected('/instructor/courses') ? '!text-white-primary' : 'text-gray-700'} inline-flex items-center font-medium`}
            >
              <BookCopy className="mr-5 h-5 w-5" />
              Courses
            </Text>
          </Link>
          <Link
            href="/instructor/profile"
            className={`py-2 px-2 rounded-md inline-flex items-center hover:bg-slate-100 ${isSelected('/instructor/profile') ? '!bg-teal-secondary' : 'bg-white-primary'}`}
          >
            <Text
              size="sm"
              as="p"
              className={`${isSelected('/instructor/profile') ? '!text-white-primary' : 'text-gray-700'} inline-flex items-center font-medium`}
            >
              <FilePenLine className="mr-5 h-5 w-5" />
              Profile
            </Text>
          </Link>
          <Link
            href="/instructor/settings"
            className={`py-2 px-2 rounded-md inline-flex items-center hover:bg-slate-100 ${isSelected('/instructor/settings') ? '!bg-teal-secondary' : 'bg-white-primary'}`}
          >
            <Text
              size="sm"
              as="p"
              className={`${isSelected('/instructor/settings') ? '!text-white-primary' : 'text-gray-700'} inline-flex items-center font-medium`}
            >
              <Settings className="mr-5 h-5 w-5" />
              Settings
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
}
