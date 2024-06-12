import { useEffect, useState } from 'react';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Progress } from '@/components/ui/progress';
import { Rate } from 'antd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Auth from '@/components/guard/auth';
import useMyCourses from '@/hooks/useMyCourses';
import { Roles } from '@/constants/enums';

export default function MyLearning() {
  const { myCourses, isLoading } = useMyCourses();

  return (
    <Auth role={Roles.STUDENT}>
      {!isLoading && (
        <div className="w-full h-full bg-slate-100">
          <div className="container h-full flex flex-col mx-auto gap-5 px-16 py-14">
            <Heading size="5xl" className="!text-gray-800">
              My learning
            </Heading>
            <Tabs defaultValue="In progress" className="w-full">
              <TabsList className="bg-slate-200 py-2 mb-2">
                <TabsTrigger value="In progress" className="px-4">
                  In progress
                </TabsTrigger>
                <TabsTrigger value="Completed" className="px-4">
                  Completed
                </TabsTrigger>
              </TabsList>
              <TabsContent value="In progress" className="w-full gap-x-8 gap-y-6 flex flex-wrap">
                {myCourses?.data?.inProgressCourses.map((item) => (
                  <div
                    key={item.id}
                    className="max-w-[280px] bg-white overflow-hidden rounded-md space-y-3 shadow-md cursor-pointer"
                  >
                    <div>
                      <Img className="w-full h-full" src={item.course.imagePreview!} alt="course image preview" />
                    </div>
                    <div className="space-y-1 px-4">
                      <Text size="sm" className="!font-medium !text-gray-700">
                        {item.course.title}
                      </Text>
                      <Text size="xs" className="!text-gray-500">{item.course.profile.displayName}</Text>
                    </div>

                    <div
                      className={`flex items-center gap-2 px-4 ${item.course.profile.displayName.length < 34 ? '!mt-8' : ''}`}
                    >
                      <Rate
                        disabled
                        className="text-xs text-yellow-500 mr-2 custom-rate"
                        defaultValue={item.review ? item.review.rating : 0}
                      />
                       <Button variant={"ghost"} size="sm" className='p-0 h-fit !font-medium text-xs text-teal-secondary'>{item.review ? 'Your rating' : 'Leave a rating'}</Button>
                    </div>

                    <div className="space-y-1 px-4 pb-4">
                      <Progress value={33} className="w-full" />
                      <Text size="xs" className="!text-gray-700">
                        33%
                      </Text>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="Completed" className="w-full gap-x-8 gap-y-6 flex flex-wrap">
              {myCourses?.data?.completedCourses.map((item) => (
                  <div
                    key={item.id}
                    className="max-w-[280px] bg-white overflow-hidden rounded-md space-y-3 shadow-md cursor-pointer"
                  >
                    <div>
                      <Img className="w-full h-full" src={item.course.imagePreview!} alt="course image preview" />
                    </div>
                    <div className="space-y-1 px-4">
                      <Text size="sm" className="!font-medium !text-gray-700">
                        {item.course.title}
                      </Text>
                      <Text size="xs" className="!text-gray-500">{item.course.profile.displayName}</Text>
                    </div>

                    <div
                      className={`flex items-center gap-2 px-4 ${item.course.profile.displayName.length < 34 ? '!mt-8' : ''}`}
                    >
                      <Rate
                        disabled
                        className="text-xs text-yellow-500 mr-2 custom-rate"
                        defaultValue={item.review ? item.review.rating : 0}
                      />
                       <Button variant={"ghost"} size="sm" className='p-0 h-fit !font-medium text-xs text-teal-secondary'>{item.review ? 'Your rating' : 'Leave a rating'}</Button>
                    </div>

                    <div className="space-y-1 px-4 pb-4">
                      <Progress value={33} className="w-full" />
                      <Text size="xs" className="!text-gray-700">
                        33%
                      </Text>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
            <div className="w-full gap-x-8 gap-y-6 flex flex-wrap"></div>
          </div>
        </div>
      )}
    </Auth>
  );
}
