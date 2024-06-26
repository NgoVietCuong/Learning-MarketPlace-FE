import { useRouter } from 'next/router';
import { useState } from 'react';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Progress } from '@/components/ui/progress';
import { Rate } from 'antd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Auth from '@/components/guard/auth';
import RatingProvider from '@/components/modal/RatingProvider';
import useMyCourses from '@/hooks/useMyCourses';
import { Roles } from '@/constants/enums';
import { MyCourse } from '@/types/schema';
import { reviewApi } from '@/services/axios/reviewApi';

export default function MyLearning() {
  const router = useRouter();
  const { myCourses, myCoursesLoading, myCoursesMutate } = useMyCourses();
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<MyCourse | null>(null);

  const handleOpenRatingModal = (course: MyCourse) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  return (
    <Auth role={Roles.STUDENT}>
      {!myCoursesLoading && (
        <div className="w-full h-full bg-slate-100">
          <div className="container h-full flex flex-col mx-auto gap-5 px-20 py-10">
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
                  <div key={item.id} className="max-w-[290px] bg-white overflow-hidden rounded-md space-y-3 shadow-md">
                    <div>
                      <Img className="w-full h-full" src={item.course.imagePreview!} alt="course image preview" />
                    </div>
                    <div className="space-y-1 px-4">
                      <Text
                        size="sm"
                        className="!font-medium cursor-pointer !text-gray-700 hover:!text-sky-600"
                        onClick={() => router.push(`/course/${item.course.slug}`)}
                      >
                        {item.course.title}
                      </Text>
                      <Text size="xs" className="!text-gray-500">
                        {item.course.profile.displayName}
                      </Text>
                    </div>

                    <div
                      className={`flex items-center gap-2 px-4 ${item.course.profile.displayName.length < 34 ? '!mt-8' : ''}`}
                    >
                      <Rate
                        disabled
                        className="text-xs text-yellow-500 mr-2 custom-rate"
                        value={item.review ? item.review.rating : 0}
                      />
                      <Button
                        variant={'ghost'}
                        size="sm"
                        className="p-0 h-fit !font-medium text-xs text-teal-secondary"
                        onClick={() => handleOpenRatingModal(item)}
                      >
                        {item.review ? 'Edit your rating' : 'Leave a rating'}
                      </Button>
                    </div>

                    <div className="space-y-1 px-4 pb-4">
                      <Progress value={item.progressStatus} className="w-full" />
                      <Text size="xs" className="!text-gray-700">
                        {item.progressStatus}%
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
                      <Text size="xs" className="!text-gray-500">
                        {item.course.profile.displayName}
                      </Text>
                    </div>

                    <div
                      className={`flex items-center gap-2 px-4 ${item.course.profile.displayName.length < 34 ? '!mt-8' : ''}`}
                    >
                      <Rate
                        disabled
                        className="text-xs text-yellow-500 mr-2 custom-rate"
                        defaultValue={item.review ? item.review.rating : 0}
                      />
                      <Button
                        variant={'ghost'}
                        size="sm"
                        className="p-0 h-fit !font-medium text-xs text-teal-secondary"
                        onClick={() => handleOpenRatingModal(item)}
                      >
                        {item.review ? 'Edit your rating' : 'Leave a rating'}
                      </Button>
                    </div>

                    <div className="space-y-1 px-4 pb-4">
                      <Progress value={item.progressStatus} className="w-full" />
                      <Text size="xs" className="!text-gray-700">
                        {item.progressStatus}%
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
      <RatingProvider
        open={open}
        setOpen={setOpen}
        header={selectedCourse?.review ? 'Edit your rating' : 'Rate this course'}
        mutate={myCoursesMutate}
        reviewId={selectedCourse?.review?.id}
        enrollmentId={selectedCourse?.id!}
        apiHandler={
          selectedCourse?.review
            ? (body) => reviewApi.updateReview(selectedCourse?.review?.id!, body)
            : reviewApi.createReview
        }
        ratingValue={selectedCourse?.review?.rating}
        commentValue={selectedCourse?.review?.comment}
      />
    </Auth>
  );
}
