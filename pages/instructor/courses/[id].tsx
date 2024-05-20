import dynamic from 'next/dynamic';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Loader2, Trash2 } from 'lucide-react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InstructorLayout from '@/components/layout/instructor-layout';
import useCourseDetails from '@/hooks/useCourseDetails';
import FailedAlert from '@/components/alert/Failed';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface InstructorCourseDetailsProps {
  id: number;
}

export default function InstructorCourseDetails({ id }: InstructorCourseDetailsProps) {
  const { courseDetails, isLoading, courseDetailsMutate } = useCourseDetails(id);
  const [saveError, setSaveError] = useState('');
  console.log(courseDetails);

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl overflow-scroll">
        <div className="px-10 py-8 flex flex-col gap-4">
          <div className="flex justify-between">
            <Heading className="!font-medium">Courses Details</Heading>
            <div className="flex items-center gap-2">
              <Button size="sm" variant={'outline'} className="p-[15px]">
                Publish
              </Button>
              <Button size="sm" variant={'destructive'} className="p-2">
                <Trash2 className="w-[17px] h-[17px]" />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="Course Info" className="w-full">
            <TabsList>
              <TabsTrigger value="Course Info">Course Info</TabsTrigger>
              <TabsTrigger value="Sections">Sections</TabsTrigger>
            </TabsList>
            <TabsContent value="Course Info" className='flex flex-col gap-3'>
              <div className="flex gap-7">
                <div className="w-[35%] flex flex-col gap-3">
                  <div className="w-full flex flex-col items-start gap-1">
                    <Text size="sm" className="font-medium !text-gray-600">
                      Course title
                    </Text>
                    <Input size="sm" type="text" placeholder="Enter course title" className="mb-[5px] pr-[100px]" />
                  </div>
                  <div className="w-full flex flex-col items-start gap-1">
                    <Text size="sm" className="font-medium !text-gray-600">
                      Overview
                    </Text>
                    <Input size="sm" type="text" placeholder="Enter course overview" className="mb-[5px] pr-[100px]" />
                  </div>
                  <div className="w-full flex flex-col items-start gap-1">
                    <Text size="sm" className="font-medium !text-gray-600">
                      Course image
                    </Text>
                    <input type="file" id="course_image" />
                    <Label htmlFor="course_image" className="w-full bg-white border border-gray-border border-dashed rounded-md h-[36px] flex items-center px-4">
                      Choose a file
                    </Label>
                  </div>
                </div>
                <div className="w-[35%] flex flex-col gap-3">
                  <div className="w-full flex flex-col items-start gap-1">
                    <Text size="sm" className="font-medium !text-gray-600">
                      Level
                    </Text>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose course level" />
                      </SelectTrigger>
                      <SelectContent className="bg-white-primary">
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full flex flex-col items-start gap-1">
                    <Text size="sm" className="font-medium !text-gray-600">
                      Price
                    </Text>
                    <Input
                      size="sm"
                      type="number"
                      placeholder="Enter course price"
                      className="mb-[5px] pr-[100px]"
                      prefix={<BsCurrencyDollar size={16} color="#6b7280" />}
                    />
                  </div>
                  <div className="w-full flex flex-col items-start gap-1">
                    <Text size="sm" className="font-medium !text-gray-600">
                      Course video
                    </Text>
                    <input type="file" id="course_video" />
                    <Label htmlFor="course_video" className="w-full bg-white border border-gray-border border-dashed rounded-md h-[36px] flex items-center px-4">
                      Choose a file
                    </Label>
                  </div>
                </div>
                <div className="w-[30%] bg-red"></div>
              </div>
              {/* <div className="w-[69%] flex flex-col items-start gap-1">
                <Text size="sm" className="font-medium !text-gray-600">
                  Description
                </Text>
                <ReactQuill theme="snow" className="quill w-full" style={{ minHeight: '220px' }} />
              </div> */}
              <div className="flex flex-col gap-3 mt-[40px]">
                <div className="w-[35%] flex flex-col items-center p-0">
                  {saveError && <FailedAlert title={'Update course info failed'} message={saveError} />}
                </div>
                <Button size="sm" className="w-[80px] bg-teal-secondary text-white-primary active:scale-95">
                  Save
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="Sections"></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { id },
  } = context;

  return {
    props: {
      id,
    },
  };
}

InstructorCourseDetails.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
