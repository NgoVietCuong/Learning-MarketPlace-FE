import { useState } from 'react';
import { useReactTable } from '@tanstack/react-table';
import { Heading } from '@/components/ui/heading';
import CourseTable from '@/components/table/course-table';
import { CourseColumns } from '@/components/table/course-table/CourseColumns';
import InstructorLayout from '@/components/layout/instructor-layout';
import useCourseList from '@/hooks/useCourseList';
import useCategories from '@/hooks/useCategories';

export default function InstructorCourses() {
  const { courseList, isLoading, courseListMutate } = useCourseList();
  const { categoryList, categoriesLoading } = useCategories();
  console.log('categoriesLoading', categoriesLoading)
  console.log('categoryList', categoryList);
  console.log('courselist', courseList);
  console.log('isLoading', isLoading)

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl">
        <div className="px-10 py-8 flex flex-col gap-4">
          <Heading className="!font-medium">
            Courses
          </Heading>
          {/* {!isLoading && <CourseTable columns={CourseColumns} data={courseList!.data!.items} meta={courseList!.data!.meta} /> } */}
        </div>
      </div>
    </div>
  );
}

InstructorCourses.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
