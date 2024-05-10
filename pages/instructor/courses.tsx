import InstructorLayout from "@/components/layout/instructor-layout";

export default function InstructorCourses() {
  return <div>Courses</div>;
}

InstructorCourses.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>
}