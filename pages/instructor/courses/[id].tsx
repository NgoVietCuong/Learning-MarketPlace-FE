import InstructorLayout from '@/components/layout/instructor-layout';

export default function InstructorCourseDetails() {
  return (
    <h1>ahihi</h1>
  )
}

InstructorCourseDetails.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
