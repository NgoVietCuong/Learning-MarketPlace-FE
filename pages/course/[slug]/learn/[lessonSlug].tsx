import LearnLayout from "@/components/layout/learn-layout";

export default function LearnCourse() {
  return (<>ahihii</>)
}

LearnCourse.getLayout = function (page: React.ReactNode) {
  return <LearnLayout>{page}</LearnLayout>
}