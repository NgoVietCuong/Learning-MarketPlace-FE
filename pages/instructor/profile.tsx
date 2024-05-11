import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { User } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import InstructorLayout from '@/components/layout/instructor-layout';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function InstructorProfile() {
  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl">
        <div className="px-8 py-6">
          <Heading size="3xl" className="!font-medium">
            Instructor Profile
          </Heading>
          <div className="w-full flex flex-col mt-[100px] gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage />
              <AvatarFallback className="bg-slate-300 text-white-primary text-center font-medium text-sm">
                <User className='w-14 h-14'/>
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-7">
              <div className="w-[35%] flex flex-col gap-3">
                <div className="w-full flex flex-col items-start gap-1">
                  <Text size="sm" className="font-medium !text-gray-600">
                    Display name
                  </Text>
                  <Input type="text" placeholder="Enter your display name" className="mb-[5px] pr-[100px]" />
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                  <Text size="sm" className="font-medium !text-gray-600">
                    Headline
                  </Text>
                  <Input type="text" placeholder="Enter your headline" className="mb-[5px] pr-[100px]" />
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                  <Text size="sm" className="font-medium !text-gray-600">
                    Biography
                  </Text>
                  <ReactQuill theme="snow" className="quill w-full" style={{ minHeight: '250px' }} />
                </div>
              </div>
              <div className="w-[30%] flex flex-col gap-3">
                <div className="w-full flex flex-col items-start gap-1">
                  <Text size="sm" className="font-medium !text-gray-600">
                    Twitter
                  </Text>
                  <Input type="text" placeholder="http://www.twitter.com/username" className="mb-[5px] pr-[100px]" />
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                  <Text size="sm" className="font-medium !text-gray-600">
                    Linkedin
                  </Text>
                  <Input type="text" placeholder="http://www.linkedin.com/username" className="mb-[5px] pr-[100px]" />
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                  <Text size="sm" className="font-medium !text-gray-600">
                    Youtube
                  </Text>
                  <Input type="text" placeholder="http://www.youtube.com/username" className="mb-[5px] pr-[100px]" />
                </div>
              </div>
            </div>
            <Button className="w-[100px] mt-[50px] bg-teal-secondary text-white-primary active:scale-95">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

InstructorProfile.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
