import InstructorLayout from "@/components/layout/instructor-layout";

export default function InstructorDashboard() {
  return <>Instructor Dashboard</>
}

InstructorDashboard.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>
}