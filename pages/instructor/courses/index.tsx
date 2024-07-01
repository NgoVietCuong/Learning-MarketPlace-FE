import { GetServerSidePropsContext } from 'next';
import { Heading } from '@/components/ui/heading';
import CourseTable from '@/components/table/course-table';
import { CourseColumns } from '@/components/table/course-table/CourseColumns';
import InstructorLayout from '@/components/layout/instructor-layout';
import useCourseList from '@/hooks/useCourseList';

interface InstructorCoursesProps {
  page: string | null;
}

export default function InstructorCourses({ page }: InstructorCoursesProps) {
  const { courseList, isLoading } = useCourseList(page);

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl">
        <div className="px-10 py-8 flex flex-col gap-4">
          <Heading className="!font-medium">
            Courses
          </Heading>
          {!isLoading && <CourseTable columns={CourseColumns} data={courseList!.data!.items} meta={courseList!.data!.meta} /> }
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { page } = query;

  return {
    props: {
      page: page ? page : null
    }
  }
}

InstructorCourses.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
