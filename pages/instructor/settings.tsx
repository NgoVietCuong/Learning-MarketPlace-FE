import InstructorLayout from "@/components/layout/instructor-layout";

export default function InstructorSettings() {
  return <div>Instructor Settings</div>
}

InstructorSettings.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>
}