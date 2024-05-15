import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import DataTable from '@/components/table/DataTable';
import { CourseColumns } from '@/components/table/CourseColumns';
import InstructorLayout from '@/components/layout/instructor-layout';
import useCourseList from '@/hooks/useCourseList';

export default function InstructorCourses() {
  const { courseList, isLoading, courseListMutate } = useCourseList();

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl">
        <div className="px-10 py-8 flex flex-col gap-8">
          <Heading className="!font-medium">
            Courses
          </Heading>
          <div className='w-full'>
            {!isLoading && <DataTable columns={CourseColumns} data={courseList!.data!.items} /> }
          </div>
        </div>
      </div>
    </div>
  );
}

InstructorCourses.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
