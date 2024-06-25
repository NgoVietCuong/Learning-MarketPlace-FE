import Link from 'next/link';
import { useRouter } from 'next/router';
import { Gauge, Undo2 } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function AdminSideBar() {
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
            href="/admin"
            className={`py-2 px-2 rounded-md inline-flex items-center hover:bg-slate-100 ${isSelected('/admin') ? '!bg-teal-secondary' : 'bg-white-primary'}`}
          >
            <Text
              size="sm"
              as="p"
              className={`${isSelected('/admin') ? '!text-white-primary' : 'text-gray-700'} inline-flex items-center font-medium`}
            >
              <Gauge className="mr-4 h-5 w-5" />
              Users
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
}
