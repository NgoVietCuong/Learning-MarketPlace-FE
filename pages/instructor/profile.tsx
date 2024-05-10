import { useState } from "react";
import InstructorLayout from "@/components/layout/instructor-layout";

export default function InstructorProfile() {
  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl">
      
      </div>
    </div>
  )
}

InstructorProfile.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>
}