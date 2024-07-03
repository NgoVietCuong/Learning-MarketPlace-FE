import { GetServerSidePropsContext } from 'next';
import { Heading } from '@/components/ui/heading';
import CourseTable from '@/components/table/course-table';
import { CourseColumns } from '@/components/table/course-table/CourseColumns';
import InstructorLayout from '@/components/layout/instructor-layout';
import useCourseList from '@/hooks/fetch-data/useCourseList';

interface InstructorCoursesProps {
  page: string | null;
  type: string | null;
  status: string | null;
  search: string | null;
  categoryId: string | null;
}

export default function InstructorCourses({ page, type, status, search, categoryId }: InstructorCoursesProps) {
  const { courseList, isLoading, courseListMutate } = useCourseList(page, type, status, search, categoryId);

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl">
        <div className="px-10 py-8 flex flex-col gap-4">
          <Heading className="!font-medium">Courses</Heading>
          {!isLoading && (
            <CourseTable
              columns={CourseColumns(courseListMutate)}
              data={courseList!.data!.items}
              meta={courseList!.data!.meta}
              filter={{search, status, type, categoryId}}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { search, page, status, type, categoryId } = query;

  return {
    props: {
      page: page || null,
      type: type || null,
      search: search || null,
      status: status || null,
      categoryId: categoryId || null,
    },
  };
}

InstructorCourses.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
