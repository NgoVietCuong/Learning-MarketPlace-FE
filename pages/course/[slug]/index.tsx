import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { IoInformationCircle } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import { Globe, Layers, Loader2, Newspaper, User } from 'lucide-react';
import { IoIosInfinite } from 'react-icons/io';
import { PiMonitorPlay } from 'react-icons/pi';
import { FaStar } from 'react-icons/fa';
import { Rate } from 'antd';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import DynamicIcon from '@/components/dynamic-icon';
import CoursePreview from '@/components/modal/CoursePreview';
import PayPalCheckoutButton from '@/components/ui/paypal-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useUser from '@/hooks/fetch-data/useUser';
import useReviews from '@/hooks/fetch-data/useReviews';
import useCourseSlug from '@/hooks/fetch-data/useCourseSlug';
import { ContentTypes } from '@/constants/filterField';
import { secondsToMinutes, secondsToHours } from '@/utils/timeConverter';
import { learnApi } from '@/services/axios/learnApi';

interface CourseSlugDetailsProps {
  slug: string;
}

export default function CourseSlugDetails({ slug }: CourseSlugDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const [rating, setRating] = useState<number | undefined>();
  const { courseSlugInfo, courseSlugLoading, courseSlugMutate } = useCourseSlug(slug);
  const { reviewList } = useReviews(slug, rating);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const handleEnrollCourse = async () => {
    if (!user || !user.data) {
      router.push('/login');
      return;
    }
    setEnrolling(true);
    const enrollCourseReponse = await learnApi.enrollCourse({ courseId: courseSlugInfo?.data?.id! });
    if (!enrollCourseReponse.error) {
      router.push(`/course/${slug}/learn/${courseSlugInfo?.data?.currentLesson.id}`);
      toast({
        variant: 'success',
        description: `Enrolled course successfully!`,
      });
    }
  };

  const handleGetReviews = (value: number) => {
    setRating(value);
  };

  return (
    <div className="w-full">
      {courseSlugLoading ? (
        <></>
      ) : (
        <>
          <div className="w-full bg-sky-900">
            <div className="container grid grid-cols-2 text-white px-20 py-14">
              <div className="flex flex-col gap-3">
                <Heading size="8xl" as="h2" className="font-semibold text-white-primary">
                  {courseSlugInfo?.data?.title}
                </Heading>
                <Text className="text-white-primary">{courseSlugInfo?.data?.overview}</Text>
                <div className="flex items-center gap-3">
                  <Text size="sm" className="!font-medium text-yellow-500">
                    {courseSlugInfo?.data?.averageRating}
                  </Text>
                  <Rate
                    defaultValue={Number(courseSlugInfo?.data?.averageRating)}
                    allowHalf
                    disabled
                    className="text-sm text-yellow-500 mr-2 custom-rate"
                  />
                  <Text size="sm" className="text-sky-500 mr-2">
                    {courseSlugInfo?.data?.totalReviews! > 1
                      ? `${courseSlugInfo?.data?.totalReviews} ratings`
                      : `${courseSlugInfo?.data?.totalReviews} rating`}
                  </Text>
                  <Text size="sm" className="text-white-primary">
                    {courseSlugInfo?.data?.totalStudents} students
                  </Text>
                </div>

                <Text size="sm" className="text-white-primary inline-flex items-center gap-1">
                  <FaUser className="w-[14px] h-[14px]" />
                  Created by:{' '}
                  <Link href={`/instructor/${courseSlugInfo?.data?.profile.slug}`} className="text-sky-500 underline">
                    {courseSlugInfo?.data?.profile.displayName}
                  </Link>
                </Text>
                <div className="flex items-center gap-5">
                  <Text size="sm" className="text-white-primary inline-flex items-center gap-1">
                    <IoInformationCircle className="w-[17px] h-[17px]" />
                    Last updated {courseSlugInfo?.data?.updatedAt.substring(0, 10)}
                  </Text>
                  <Text size="sm" className="text-white-primary inline-flex items-center gap-1">
                    <Globe className="w-[16px] h-[16px]" />
                    English
                  </Text>
                  <Text size="sm" className="text-white-primary inline-flex items-center gap-1">
                    <Layers className="w-[16px] h-[16px]" />
                    {courseSlugInfo?.data?.level}
                  </Text>
                </div>
              </div>
              <div className="relative">
                <div className="max-w-sm bg-white mx-auto text-black absolute shadow-xl right-0 overflow-hidden">
                  <div className="relative h-[12.375rem] w-[22rem]">
                    {courseSlugInfo?.data?.videoPreview && (
                      <>
                        <Button
                          variant={'ghost'}
                          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-14 h-14 rounded-full bg-white-primary"
                          onClick={() => setPreviewOpen(!previewOpen)}
                        >
                          <TbPlayerPlayFilled className="w-10 h-10" />
                        </Button>
                        <Text
                          size="s"
                          className="absolute bottom-[10%] left-[50%] translate-x-[-50%] !font-medium !text-white-primary"
                        >
                          Preview this course
                        </Text>
                        <CoursePreview
                          open={previewOpen}
                          setOpen={setPreviewOpen}
                          src={courseSlugInfo?.data?.videoPreview}
                        />
                      </>
                    )}
                    <Img
                      className="w-full h-full"
                      src={courseSlugInfo?.data?.imagePreview!}
                      alt="course image preview"
                    />
                  </div>
                  <div className="px-8 py-6 space-y-5 bg-white-primary">
                    {courseSlugInfo?.data?.hasEnrolled ? (
                      <Button
                        size="lg"
                        className="w-full bg-teal-secondary text-white-primary"
                        onClick={() => router.push(`/course/${slug}/learn/${courseSlugInfo?.data?.currentLesson.id}`)}
                      >
                        Go to course
                      </Button>
                    ) : courseSlugInfo?.data?.price ? (
                      <div className="space-y-3">
                        <Heading size="5xl" as="h2" className="font-semibold text-gray-700">
                          ${courseSlugInfo?.data?.price}
                        </Heading>
                        <PayPalCheckoutButton courseId={courseSlugInfo.data.id} mutate={courseSlugMutate} />
                      </div>
                    ) : (
                      <Button
                        disabled={!courseSlugInfo || enrolling}
                        size="lg"
                        className="w-full bg-teal-secondary text-white-primary"
                        onClick={handleEnrollCourse}
                      >
                        {enrolling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Enroll course
                      </Button>
                    )}
                    <div className="flex flex-col gap-3">
                      <Text size="sm" className="!font-medium !text-gray-700">
                        This course includes:
                      </Text>
                      {courseSlugInfo?.data?.totalVideoDuration && (
                        <Text size="tx" className="!text-gray-700 inline-flex items-center">
                          <PiMonitorPlay className="w-[19px] h-[19px] mr-2 text-gray-700" />
                          {courseSlugInfo?.data?.totalVideoDuration} high quality video
                        </Text>
                      )}
                      {courseSlugInfo?.data?.totalArticles && courseSlugInfo?.data?.totalArticles > 0 && (
                        <Text size="tx" className="!text-gray-700 inline-flex items-center">
                          <Newspaper className="w-[17px] h-[17px] mr-2 text-gray-600" />
                          {courseSlugInfo?.data?.totalArticles} articles
                        </Text>
                      )}
                      <Text size="tx" className="!text-gray-700 inline-flex items-center">
                        <IoIosInfinite className="w-[18px] h-[18px] mr-2 text-gray-700" />
                        Full lifetime access
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-0 ">
            <div className="container px-20 py-10 space-y-10">
              <div className="space-y-3 w-3/5">
                <Heading size="4xl" className="!font-semibold !text-gray-800">
                  Course content
                </Heading>
                <Accordion type="multiple">
                  {courseSlugInfo?.data?.sections?.map((section) => (
                    <AccordionItem
                      key={section.id as number}
                      value={section.id.toString()}
                      className="pb-0 border-x-[1px] border-t-[1px] border-slate-300"
                    >
                      <div className="flex justify-between h-[42px] items-center bg-slate-100 px-5 border-none">
                        <Text size="sm" className="!font-medium !text-gray-700">
                          {section.title}
                        </Text>
                        <div className="flex items-center gap-3">
                          <Text size="tx" className="!font-medium !text-gray-600">
                            {section.lessons.length > 1
                              ? `${section.lessons.length} lessons`
                              : `${section.lessons.length} lesson`}
                          </Text>
                          <Text size="tx" className="!font-medium !text-gray-600">
                            {secondsToHours(
                              section.lessons.reduce((prev, currentObject) => {
                                return currentObject.duration ? prev + currentObject.duration : prev;
                              }, 0),
                            )}
                          </Text>
                          <AccordionTrigger />
                        </div>
                      </div>
                      <AccordionContent>
                        {section.lessons.map((lesson) => (
                          <div key={lesson.id as number} className="flex justify-between items-center px-4 py-3">
                            <div className="flex items-center gap-3">
                              <DynamicIcon
                                iconName={ContentTypes[lesson.contentType]}
                                className="w-4 h-4 text-gray-700"
                              />
                              <Text size="sm" className="!text-gray-700">
                                {lesson.title}
                              </Text>
                            </div>
                            <Text>{lesson.duration ? `${secondsToMinutes(lesson.duration)}` : 'read'}</Text>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="space-y-3 w-3/5">
                <Heading size="4xl" className="!font-semibold !text-gray-800">
                  Description
                </Heading>
                <div
                  className="description text-[13px]"
                  dangerouslySetInnerHTML={{ __html: courseSlugInfo?.data?.description! }}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-full p-0 border-t">
            <div className="container px-20 py-10 space-y-10 ">
              <div className="space-y-3 w-full">
                <Heading size="4xl" className="!font-semibold !text-gray-800">
                  Reviews <span className="text-base">({courseSlugInfo?.data?.totalReviews})</span>
                </Heading>
                <div className="flex gap-28">
                  <div className="flex flex-col w-[26%] gap-4">
                    <div>
                      <Text size="s" className="!font-semibold !text-gray-700">
                        Overall rating
                      </Text>
                      <Text size="2xl" className="!font-semibold !text-gray-700 inline-flex items-center gap-2">
                        {courseSlugInfo?.data?.averageRating}
                        <Rate
                          disabled
                          allowHalf
                          defaultValue={Number(courseSlugInfo?.data?.averageRating)}
                          className="text-base text-yellow-500"
                        />
                      </Text>
                    </div>
                    <div className="space-y-1">
                      <div className={`flex items-center gap-3 cursor-pointer ${(rating && rating !== 5) ? 'opacity-30' : '' }`} onClick={() => handleGetReviews(5)}>
                        <div className="flex justify-between items-center !w-[27px] min-w-[27px]">
                          <Text size="sm" className="!font-medium !text-gray-700 inline-flex items-center">
                            5
                          </Text>
                          <FaStar className="text-xs text-yellow-500" />
                        </div>
                        <Progress
                          value={
                            (Number(courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 5)?.count) /
                              courseSlugInfo?.data?.totalReviews!) *
                            100
                          }
                        />
                        <Text
                          size="sm"
                          className="!font-medium !text-gray-700 underline"
                        >
                          {courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 5)?.count}
                        </Text>
                      </div>
                      <div className={`flex items-center gap-3 cursor-pointer ${(rating && rating !== 4) ? 'opacity-30' : '' }`} onClick={() => handleGetReviews(4)}>
                        <div className="flex justify-between items-center !w-[27px] min-w-[27px]">
                          <Text size="sm" className="!font-medium !text-gray-700 inline-flex items-center">
                            4
                          </Text>
                          <FaStar className="text-xs text-yellow-500" />
                        </div>
                        <Progress
                          value={
                            (Number(courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 4)?.count) /
                              courseSlugInfo?.data?.totalReviews!) *
                            100
                          }
                        />
                        <Text
                          size="sm"
                          className="!font-medium !text-gray-700 underline"
                        >
                          {courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 4)?.count}
                        </Text>
                      </div>
                      <div className={`flex items-center gap-3 cursor-pointer ${(rating && rating !== 3) ? 'opacity-30' : '' }`} onClick={() => handleGetReviews(3)}>
                        <div className="flex justify-between items-center !w-[27px] min-w-[27px]">
                          <Text size="sm" className="!font-medium !text-gray-700 inline-flex items-center">
                            3
                          </Text>
                          <FaStar className="text-xs text-yellow-500" />
                        </div>
                        <Progress
                          value={
                            (Number(courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 3)?.count) /
                              courseSlugInfo?.data?.totalReviews!) *
                            100
                          }
                        />
                        <Text
                          size="sm"
                          className="!font-medium !text-gray-700 underline"
                        >
                          {courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 3)?.count}
                        </Text>
                      </div>
                      <div className={`flex items-center gap-3 cursor-pointer ${(rating && rating !== 2) ? 'opacity-30' : '' }`} onClick={() => handleGetReviews(2)}>
                        <div className="flex justify-between items-center !w-[27px] min-w-[27px]">
                          <Text size="sm" className="!font-medium !text-gray-700 inline-flex items-center">
                            2
                          </Text>
                          <FaStar className="text-xs text-yellow-500" />
                        </div>
                        <Progress
                          value={
                            (Number(courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 2)?.count) /
                              courseSlugInfo?.data?.totalReviews!) *
                            100
                          }
                        />
                        <Text
                          size="sm"
                          className="!font-medium !text-gray-700 underline"
                        >
                          {courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 2)?.count}
                        </Text>
                      </div>
                      <div className={`flex items-center gap-3 cursor-pointer ${(rating && rating !== 1) ? 'opacity-30' : '' }`} onClick={() => handleGetReviews(1)}>
                        <div className="flex justify-between items-center !w-[27px] min-w-[27px]">
                          <Text size="sm" className="!font-medium !text-gray-700 inline-flex items-center">
                            1
                          </Text>
                          <FaStar className="text-xs text-yellow-500" />
                        </div>
                        <Progress
                          value={
                            (Number(courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 1)?.count) /
                              courseSlugInfo?.data?.totalReviews!) *
                            100
                          }
                        />
                        <Text
                          size="sm"
                          className="!font-medium !text-gray-700 underline"
                        >
                          {courseSlugInfo?.data?.numberEachRatings.find((item) => item.rate === 1)?.count}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-[60%]">
                    {reviewList && (
                      <div className="flex flex-col gap-6 h-full">
                        {reviewList?.data?.items?.length! === 0 && <div className='w-full h-full flex justify-center items-center'><Text>No reviews found</Text></div>}
                        {reviewList?.data?.items?.length! > 0 && reviewList?.data?.items.map((item) => (
                          <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={item?.enrollment?.user?.avatar ? item?.enrollment?.user?.avatar : undefined}
                                  />
                                  <AvatarFallback className="bg-slate-300 text-white-primary text-center font-medium text-sm">
                                    <User className="w-6 h-6" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-0">
                                  <Text size="sm" className="!font-medium !text-gray-700">
                                    {item?.enrollment?.user?.username}
                                  </Text>
                                  <Rate className="text-xs text-yellow-500" disabled value={item?.rating} />
                                </div>
                              </div>
                              <Text size="tx" className="">
                                {item?.updatedAt.substring(0, 10)}
                              </Text>
                            </div>
                            <Text size="sm" className="!text-gray-700">
                              {item?.comment}
                            </Text>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { slug },
  } = context;

  return {
    props: {
      slug,
    },
  };
}
