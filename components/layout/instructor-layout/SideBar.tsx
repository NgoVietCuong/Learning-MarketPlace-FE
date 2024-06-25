import Link from 'next/link';
import { useRouter } from 'next/router';
import { Undo2, BookCopy, Gauge, FilePenLine, Wallet } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

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
    <div className="min-w-[260px] w-[260px] h-[100%] z-5 bg-white-primary shadow-lg">
      <div className="w-full h-full flex flex-col px-4 py-4 space-y-1">
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="ghost"
            className="px-2 text-teal-secondary flex items-center"
            onClick={() => router.push('/')}
          >
            <Undo2 className="w-[16px] h-[16px] text-teal-secondary mr-2" />
            Home page
          </Button>
        </div>

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
              <Gauge className="mr-4 h-5 w-5" />
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
              <BookCopy className="mr-4 h-5 w-5" />
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
              <FilePenLine className="mr-4 h-5 w-5" />
              Profile
            </Text>
          </Link>
          <Link
            href="/instructor/wallet"
            className={`py-2 px-2 rounded-md inline-flex items-center hover:bg-slate-100 ${isSelected('/instructor/wallet') ? '!bg-teal-secondary' : 'bg-white-primary'}`}
          >
            <Text
              size="sm"
              as="p"
              className={`${isSelected('/instructor/wallet') ? '!text-white-primary' : 'text-gray-700'} inline-flex items-center font-medium`}
            >
              <Wallet className="mr-4 h-5 w-5" />
              Wallet
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
}
