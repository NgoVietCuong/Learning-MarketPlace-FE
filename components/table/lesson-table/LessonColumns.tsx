import { ColumnDef } from '@tanstack/react-table';
import { FilePenLine, Trash2, CircleCheck, CircleAlert, WalletMinimal, DollarSign } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import DeleteAction from '@/components/modal/DeleteAction';
import { Lesson } from '@/types/schema';

export const LessonColumns: ColumnDef<Lesson>[] = [
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
  },
  {
    accessorKey: 'contentType',
    header: () => (
      <Text size="xs" className="font-medium">
        Content type
      </Text>
    ),
    cell: ({ row }) => (
      <Text size="sm" className="!font-medium !text-gray-600 pl-5">
        {row.getValue('contentType')}
      </Text>
    ),
  },
];
