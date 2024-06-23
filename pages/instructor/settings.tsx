import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import InstructorLayout from "@/components/layout/instructor-layout";

export default function InstructorSettings() {
  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl overflow-y-scroll">
        <div className="px-10 py-8 flex flex-col gap-8">
            <Heading className="!font-medium">Instructor Profile</Heading>
            <div className="w-full flex flex-col gap-5">
              <Button>Login to paypal</Button>
            </div>
        </div>
      </div>
    </div>
  )
}

InstructorSettings.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>
}