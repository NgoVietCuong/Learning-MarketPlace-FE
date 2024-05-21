
import { useRouter } from 'next/router';
import { ColumnDef } from '@tanstack/react-table';
import { FilePenLine, Trash2, CircleCheck, CircleAlert, WalletMinimal, DollarSign } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DeleteAction from '@/components/modal/DeleteAction';
import { CategoryList, Course } from '@/types/schema';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';
import useCourseList from '@/hooks/useCourseList';

export const CourseColumns: ColumnDef<Course>[] = [
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
          <Text size='sm' as='p' className='!text-gray-600'>Published</Text>
        </div>
      ) : (
        <div className="flex gap-1 items-center">
          <CircleAlert className="w-4 h-4 text-gray-500" />
          <Text size='sm' as='p' className='!text-gray-600'>Unpublished</Text>
        </div>
      ),
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
          <Text size='sm' as='p' className='!text-gray-600'>Paid</Text>
        </div>
      ) : (
        <div className="flex gap-1 items-center">
          <WalletMinimal className="w-4 h-4 text-sky-500" />
          <Text size='sm' as='p' className='!text-gray-600'>Free</Text>
        </div>
      ),
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
          <Badge variant={'info'}>
            <Text className="!font-medium text-sky-600">{category.name}</Text>
          </Badge>
        ))}
      </div>
    ),
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
      const { courseListMutate } = useCourseList();

      return (
        <div className="flex flex-start">
        <Button variant={'ghost'} className="p-2 hover:bg-slate-200" onClick={() => router.push(`/instructor/courses/${row.original.id}`)}>
          <FilePenLine className="w-[17px] h-[17px] text-gray-600" />
        </Button>
        <DeleteAction title={'Delete Course?'} object={'course'} mutate={courseListMutate} apiHandler={() => instructorCourseApi.deleteCourse(row.original.id)}  />
      </div>
      )
    }
  },
];
