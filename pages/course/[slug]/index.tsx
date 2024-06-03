import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { IoInformationCircle } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import { Globe, Layers } from 'lucide-react';
import { Rate } from 'antd';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useToast } from '@/components/ui/use-toast';
import DynamicIcon from '@/components/dynamic-icon';
import CoursePreview from '@/components/modal/CoursePreview';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useCourseSlug from '@/hooks/useCourseSlug';
import useReviews from '@/hooks/useReviews';
import { ContentTypes } from '@/constants/filterField';
import { secondsToMinutes, secondsToHours } from '@/utils/timeConverter';

interface CourseSlugDetailsProps {
  slug: string;
}

export default function CourseSlugDetails({ slug }: CourseSlugDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { courseSlugInfo, courseSlugLoading } = useCourseSlug(slug);
  const { reviewList, reviewLoading } = useReviews(slug);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div className="w-full">
      {courseSlugLoading ? (
        <></>
      ) : (
        <>
          <div className="w-full bg-sky-900">
            <div className="container grid grid-cols-2 text-white px-16 py-14">
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
                    defaultValue={courseSlugInfo?.data?.averageRating}
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
                  <Link href="#" className="text-sky-500 underline">
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
                  <div className="relative h-54 w-96">
                    {courseSlugInfo?.data?.videoPreview && (
                      <>
                        <Button
                          variant={'ghost'}
                          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-14 h-14 rounded-full bg-white-primary"
                          onClick={() => setPreviewOpen(!previewOpen)}
                        >
                          <TbPlayerPlayFilled className="w-10 h-10" />
                        </Button>
                        <Text size="s" className='absolute bottom-[10%] left-[50%] translate-x-[-50%] !font-medium !text-white-primary'>Preview this course</Text>
                        <CoursePreview open={previewOpen} setOpen={setPreviewOpen} src={courseSlugInfo?.data?.videoPreview} />
                      </>
                    )}
                    <Img src={courseSlugInfo?.data?.imagePreview!} />
                  </div>
                  <div className="p-8 space-y-4 bg-white-primary">
                    {courseSlugInfo?.data?.hasEnrolled ? (
                      courseSlugInfo.data.price ? (
                        <Button>Buy now</Button>
                      ) : (
                        <Button>Enroll course</Button>
                      )
                    ) : (
                      <Button size="lg" className="w-full bg-teal-secondary text-white-primary">
                        Go to course
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-0">
            <div className="container px-16 py-14">
              <div className="space-y-4 w-3/5">
                <Heading className="!font-semibold !text-gray-700">Course content</Heading>
                <Accordion type="multiple">
                  {courseSlugInfo?.data?.sections?.map((section) => (
                    <AccordionItem value={section.id.toString()} className="pb-0 border-x-[1px] border-t-[1px] border-slate-300">
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
                          <div className="flex justify-between items-center px-4 py-3">
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
