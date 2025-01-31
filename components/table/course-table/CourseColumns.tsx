import { useRouter } from 'next/router';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FilePenLine, Trash2, CircleCheck, CircleAlert, WalletMinimal, DollarSign } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DeleteAction from '@/components/modal/DeleteAction';
import { CategoryList, Course } from '@/types/schema';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';
import useCourseList from '@/hooks/fetch-data/useCourseList';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

export const CourseColumns = (mutate: () => void): ColumnDef<Course>[] => [
  {
    accessorKey: 'title',
    header: () => (
      <Text size="xs" className="font-medium pl-5">
        Title
      </Text>
    ),
    cell: ({ row }) => (
      <Text size="sm" className="!font-medium !text-gray-600 pl-5">
        {row.getValue('title')}
      </Text>
    ),
    meta: { className: 'max-w-[25%]'}
  },
  {
    accessorKey: 'isPublished',
    header: () => (
      <Text size="xs" className="font-medium">
        Status
      </Text>
    ),
    cell: ({ row }) =>
      row.getValue('isPublished') ? (
        <div className="flex gap-1 items-center">
          <CircleCheck className="w-4 h-4 text-teal-500" />
          <Text size="sm" as="p" className="!text-gray-600">
            Published
          </Text>
        </div>
      ) : (
        <div className="flex gap-1 items-center">
          <CircleAlert className="w-4 h-4 text-gray-500" />
          <Text size="sm" as="p" className="!text-gray-600">
            Unpublished
          </Text>
        </div>
      ),
    meta: { className: 'max-w-[15%]' }
  },
  {
    accessorKey: 'price',
    header: () => (
      <Text size="xs" className="font-medium">
        Type
      </Text>
    ),
    cell: ({ row }) =>
      row.getValue('price') ? (
        <div className="flex gap-1 items-center">
          <DollarSign className="w-4 h-4 text-teal-500" />
          <Text size="sm" as="p" className="!text-gray-600">
            Paid
          </Text>
        </div>
      ) : (
        <div className="flex gap-1 items-center">
          <WalletMinimal className="w-4 h-4 text-sky-500" />
          <Text size="sm" as="p" className="!text-gray-600">
            Free
          </Text>
        </div>
      ),
    meta: { className: 'max-w-[15%]' }
  },
  {
    accessorKey: 'categories',
    header: () => (
      <Text size="xs" className="font-medium">
        Categories
      </Text>
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        {(row.getValue('categories') as CategoryList).map((category) => (
          <Badge variant={'info'} key={category.id}>
            <Text className="!font-medium text-sky-600">{category.name}</Text>
          </Badge>
        ))}
      </div>
    ),
    meta: { className: 'max-w-[25%]' }
  },
  {
    id: 'actions',
    header: () => (
      <Text size="xs" className="font-medium">
        Actions
      </Text>
    ),
    cell: ({ row }) => {
      const router = useRouter();
      const [open, setOpen] = useState(false);

      return (
        <div className="flex flex-start">
          <Button
            variant={'ghost'}
            className="p-2 hover:bg-slate-200"
            onClick={() => router.push(`/instructor/courses/${row.original.id}?tab=course-info`)}
          >
            <FilePenLine className="w-[17px] h-[17px] text-gray-600" />
          </Button>
          <Button variant={'ghost'} className="p-2 hover:bg-slate-200" onClick={() => setOpen(!open)}>
            <Trash2 className="w-[18px] h-[18px] text-gray-600" />
          </Button>
          <DeleteAction
            title={'Delete Course?'}
            object={'course'}
            open={open}
            setOpen={setOpen}
            mutate={mutate}
            apiHandler={() => instructorCourseApi.deleteCourse(row.original.id)}
          />
        </div>
      );
    },
    meta: { className: 'max-w-[25%]' }
  },
];
