import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import InstructorLayout from '@/components/layout/instructor-layout';

export default function InstructorDashboard() {
  return (
    <div className="grow flex justify-center items-center">
      <div className="flex flex-col gap-5 w-[95%] h-[95%]">
        <div className="px-10 flex flex-col gap-8">
          <Heading className="!font-medium">Dashboard</Heading>
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center justify-center w-[14%] h-[200px] bg-teal-500 rounded-md">
              <Text>Total Students</Text>
              <Text>1220</Text>
            </div>
            <div className="flex flex-col items-center justify-center w-[14%] h-[200px] bg-teal-500 rounded-md">
              <Text>Total Reviews</Text>
              <Text>1220</Text>
            </div>
            <div className="flex flex-col items-center justify-center w-[14%] h-[200px] bg-teal-500 rounded-md">
              <Text>Average Rating</Text>
            </div>
            <div className="flex flex-col items-center justify-center w-[14%] h-[200px] bg-teal-500 rounded-md">
              <Text>Total Income</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

InstructorDashboard.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
