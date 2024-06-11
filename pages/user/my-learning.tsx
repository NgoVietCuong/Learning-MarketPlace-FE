import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Progress } from '@/components/ui/progress';
import { Rate } from 'antd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Auth from '@/components/guard/auth';
import useMyCourses from '@/hooks/useMyCourses';
import { Roles } from '@/constants/enums';

export default function MyLearning() {
  return (
    <Auth role={Roles.STUDENT}>
      <div className="w-full h-full bg-slate-100">
        <div className="w-[90%] h-full flex flex-col mx-auto gap-5 px-[150px] py-14">
          <Heading size="5xl" className="!text-gray-700">
            My learning
          </Heading>
          <Tabs defaultValue="Course Info" className="w-full">
            <TabsList className="bg-slate-200 py-2 mb-2">
              <TabsTrigger value="Course Info" className="px-4">
                In progress
              </TabsTrigger>
              <TabsTrigger value="Sections" className="px-4">
                Completed
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="w-full gap-x-8 gap-y-5 flex flex-wrap">
            <div className="max-w-[290px] bg-white overflow-hidden rounded-md space-y-3 shadow-md cursor-pointer">
              <div>
                <Img
                  className="w-full h-full"
                  src={
                    'https://res.cloudinary.com/dvz7322mp/image/upload/v1717212317/hlm-dev/course-image/3/owoagwggopoh2stwlyrf.jpg'
                  }
                  alt="course image preview"
                />
              </div>
              <div className="space-y-1 px-4">
                <Text size="sm" className="!font-medium !text-gray-700">
                  The Complete Javascript Course 2024
                </Text>
                <Text size="xs">Orian kou</Text>
              </div>

              <div className="flex items-center gap-2 px-4 ">
                <Rate className="text-sm text-yellow-500 mr-2 custom-rate" />
                <Text size="xs">Your rating</Text>
              </div>

              <div className="space-y-1 px-4 pb-4">
                <Progress value={33} className="w-full" />
                <Text size="xs" className="!text-gray-700">
                  33%
                </Text>
              </div>


            </div>

            <div className="max-w-[290px] bg-white overflow-hidden rounded-md space-y-3 shadow-md cursor-pointer">
              <div>
                <Img
                  className="w-full h-full"
                  src={
                    'https://res.cloudinary.com/dvz7322mp/image/upload/v1717212317/hlm-dev/course-image/3/owoagwggopoh2stwlyrf.jpg'
                  }
                  alt="course image preview"
                />
              </div>
              <div className="space-y-1 px-4">
                <Text size="sm" className="!font-medium !text-gray-700">
                  The Complete Javascript Course 2024: From Zero to Expert
                </Text>
                <Text size="xs">Orian kou</Text>
              </div>

              <div className="space-y-1 px-4 pb-4">
                <Progress value={33} className="w-full" />
                <Text size="xs" className="!text-gray-700">
                  33%
                </Text>
              </div>
            </div>

            <div className="max-w-[290px] bg-white overflow-hidden rounded-md space-y-3 shadow-md cursor-pointer">
              <div>
                <Img
                  className="w-full h-full"
                  src={
                    'https://res.cloudinary.com/dvz7322mp/image/upload/v1717212317/hlm-dev/course-image/3/owoagwggopoh2stwlyrf.jpg'
                  }
                  alt="course image preview"
                />
              </div>
              <div className="space-y-1 px-4">
                <Text size="sm" className="!font-medium !text-gray-700">
                  The Complete Javascript Course 2024: From Zero to Expert
                </Text>
                <Text size="xs">Orian kou</Text>
              </div>

              <div className="space-y-1 px-4 pb-4">
                <Progress value={33} className="w-full" />
                <Text size="xs" className="!text-gray-700">
                  33%
                </Text>
              </div>
            </div>

            <div className="max-w-[290px] bg-white overflow-hidden rounded-md space-y-3 shadow-md">
              <div>
                <Img
                  className="w-full h-full"
                  src={
                    'https://res.cloudinary.com/dvz7322mp/image/upload/v1717212317/hlm-dev/course-image/3/owoagwggopoh2stwlyrf.jpg'
                  }
                  alt="course image preview"
                />
              </div>
              <div className="space-y-1 px-4">
                <Text size="sm" className="!font-medium !text-gray-700">
                  The Complete Javascript Course 2024: From Zero to Expert
                </Text>
                <Text size="xs">Orian kou</Text>
              </div>

              <div className="space-y-1 px-4 pb-4">
                <Progress value={33} className="w-full" />
                <Text size="xs" className="!text-gray-700">
                  33%
                </Text>
              </div>
            </div>

            <div className="max-w-[290px] bg-white overflow-hidden rounded-md space-y-3 shadow-md">
              <div>
                <Img
                  className="w-full h-full"
                  src={
                    'https://res.cloudinary.com/dvz7322mp/image/upload/v1717212317/hlm-dev/course-image/3/owoagwggopoh2stwlyrf.jpg'
                  }
                  alt="course image preview"
                />
              </div>
              <div className="space-y-1 px-4">
                <Text size="sm" className="!font-medium !text-gray-700">
                  The Complete Javascript Course 2024: From Zero to Expert
                </Text>
                <Text size="xs">Orian kou</Text>
              </div>

              <div className="space-y-1 px-4 pb-4">
                <Progress value={33} className="w-full" />
                <Text size="xs" className="!text-gray-700">
                  33%
                </Text>
              </div>
            </div>

            <div className="max-w-[290px] bg-white overflow-hidden rounded-md space-y-3 shadow-md">
              <div>
                <Img
                  className="w-full h-full"
                  src={
                    'https://res.cloudinary.com/dvz7322mp/image/upload/v1717212317/hlm-dev/course-image/3/owoagwggopoh2stwlyrf.jpg'
                  }
                  alt="course image preview"
                />
              </div>
              <div className="space-y-1 px-4">
                <Text size="sm" className="!font-medium !text-gray-700">
                  Javascript for beginner
                </Text>
                <Text size="xs">Orian kou</Text>
              </div>

              <div className="!mt-8 px-4 pb-4">
                <Progress value={33} className="w-full" />
                <Text size="xs" className="!text-gray-700">
                  33%
                </Text>
              </div>
            </div>

            <div className="max-w-[290px] bg-white overflow-hidden rounded-md space-y-3 shadow-md">
              <div>
                <Img
                  className="w-full h-full"
                  src={
                    'https://res.cloudinary.com/dvz7322mp/image/upload/v1717212317/hlm-dev/course-image/3/owoagwggopoh2stwlyrf.jpg'
                  }
                  alt="course image preview"
                />
              </div>
              <div className="space-y-1 px-4">
                <Text size="sm" className="!font-medium !text-gray-700">
                  Javascript for beginner
                </Text>
                <Text size="xs">Orian kou</Text>
              </div>

              <div className="!mt-8 px-4 pb-4">
                <Progress value={33} className="w-full" />
                <Text size="xs" className="!text-gray-700">
                  33%
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
}
