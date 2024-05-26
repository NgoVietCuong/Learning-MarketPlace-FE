import { useRouter } from 'next/router';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FilePenLine, Trash2, CircleCheck, CircleAlert } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import DeleteAction from '@/components/modal/DeleteAction';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';
import useCourseDetails from '@/hooks/useCourseDetails';
import { Lesson } from '@/types/schema';

interface ActionsProps {
  lessonId: number;
  courseId: number;
}

const Actions: React.FC<ActionsProps> = ({ lessonId, courseId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { courseDetailsMutate } = useCourseDetails(courseId);

  return (
    <div className="flex justify-center">
      <Button
        variant={'ghost'}
        className="p-2 hover:bg-slate-200"
        onClick={() => router.push(`/instructor/courses/${courseId}/${lessonId}`)}
      >
        <FilePenLine className="w-[17px] h-[17px] text-gray-600" />
      </Button>
      <Button variant={'ghost'} className="p-2 hover:bg-slate-200" onClick={() => setOpen(!open)}>
        <Trash2 className="w-[18px] h-[18px] text-gray-600" />
      </Button>
      <DeleteAction
        title={'Delete Lesson?'}
        object={'lesson'}
        open={open}
        setOpen={setOpen}
        mutate={courseDetailsMutate}
        apiHandler={() => instructorCourseApi.deleteLesson(lessonId)}
      />
    </div>
  );
};

export function LessonColumns(couresId: number): ColumnDef<Lesson>[] {
  return [
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
        <Text size="sm" className="!text-gray-600">
          {row.getValue('contentType')}
        </Text>
      ),
    },
    {
      id: 'actions',
      header: () => (
        <Text size="xs" className="font-medium text-center">
          Actions
        </Text>
      ),
      cell: ({ row }) => (
        <Actions courseId={couresId} lessonId={row.original.id} />
      )
    },
  ]
}
