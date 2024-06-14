import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { User } from 'lucide-react';
import { HiCheckBadge } from 'react-icons/hi2';
import { PiStudentFill } from 'react-icons/pi';
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';
import { Rate } from 'antd';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useInstructorSlug from '@/hooks/useInstructorSlug';

interface InstructorInfoProps {
  slug: string;
}

export default function InstructorInfo({ slug }: InstructorInfoProps) {
  const router = useRouter();
  const { instructorSlugInfo, instructorSlugLoading } = useInstructorSlug(slug);

  return (
    <div className="w-full h-full">
      {instructorSlugLoading ? (
        <></>
      ) : (
        <div className="w-full h-full bg-white-primary">
          <div className="w-full bg-sky-900">
            <div className="container px-20 py-14 flex gap-5">
              <Avatar className="h-[7.5rem] w-[7.5rem]">
                <AvatarImage src={instructorSlugInfo?.data?.picture ? instructorSlugInfo?.data?.picture : undefined} />
                <AvatarFallback className="bg-slate-300 text-white-primary text-center font-medium text-sm">
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-0">
                  <Heading size="8xl" as="h2" className="font-semibold text-white-primary">
                    {instructorSlugInfo?.data?.displayName}
                  </Heading>
                  <Text className="text-white-primary">{instructorSlugInfo?.data?.introduction}</Text>
                </div>

                <div className="flex items-center gap-5">
                  <Text size="sm" className="text-white-primary inline-flex items-center">
                    <PiStudentFill className="w-[18px] h-[18px] mr-1" />
                    {instructorSlugInfo?.data?.totalStudents} students
                  </Text>
                  <Text size="sm" className="text-white-primary inline-flex items-center">
                    <HiCheckBadge className="w-[18px] h-[18px] mr-1" />
                    {instructorSlugInfo?.data?.totalReviews} reviews
                  </Text>
                  <Text size="sm" className="text-white-primary inline-flex items-center">
                    <FaStar className="text-base text-yellow-500 mr-2" />
                    {instructorSlugInfo?.data?.averageRating} instructor rating
                  </Text>
                </div>

                <div className="flex items-center gap-3">
                  {instructorSlugInfo?.data?.twitterLink && <Link href={instructorSlugInfo?.data?.twitterLink} target='_blank'><Text size="tx" className='!text-white-primary !font-medium inline-flex items-center bg-teal-secondary px-4 py-1.5 rounded-md'><FaTwitter className="w-[14px] h-[14px] mr-1.5" />Twitter</Text></Link>}
                  {instructorSlugInfo?.data?.linkedinLink && <Link href={instructorSlugInfo?.data?.linkedinLink} target='_blank'><Text size="tx" className='!text-white-primary !font-medium inline-flex items-center bg-teal-secondary px-4 h-[34px] rounded-md'><FaLinkedinIn className="w-[14px] h-[14px] mr-1.5" />Linkedin</Text></Link>}
                  {instructorSlugInfo?.data?.youtubeLink && <Link href={instructorSlugInfo?.data?.youtubeLink} target='_blank'><Text size="tx" className='!text-white-primary !font-medium inline-flex items-center bg-teal-secondary px-4 h-[34px] rounded-md'><FaYoutube className="w-[14px] h-[14px] mr-1.5" />Youtube</Text></Link>}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-0">
            <div className="container px-20 py-10 space-y-10">
              <div className="space-y-3 w-3/5">
                <Heading size="4xl" className="!font-semibold !text-gray-800">
                  About me
                </Heading>
                <div
                  className="description text-[14px]"
                  dangerouslySetInnerHTML={{ __html: instructorSlugInfo?.data?.biography || '' }}
                ></div>
              </div>

              <div className="space-y-3 w-full">
                <Heading size="4xl" className="!font-semibold !text-gray-800">
                  My courses
                </Heading>
                <div className="w-full flex flex-wrap gap-x-8 gap-y-6">
                  {instructorSlugInfo?.data?.courses.map((course) => (
                    <div
                      key={course.id}
                      className="max-w-[300px] bg-white overflow-hidden rounded-md space-y-3 shadow-md cursor-pointer"
                      onClick={() => router.push(`/course/${course.slug}`)}
                    >
                      <div>
                        <Img className="w-full h-full" src={course.imagePreview!} alt="course image preview" />
                      </div>
                      <div className="space-y-1 px-4">
                        <Text size="sm" className="!font-medium !text-gray-700">
                          {course.title}
                        </Text>
                        <Text size="xs" className="!text-gray-500">
                          {instructorSlugInfo?.data?.displayName}
                        </Text>
                      </div>

                      <div className={`flex flex-col gap-1.5 px-4 pb-4 ${course.title.length < 34 ? '!mt-8' : ''}`}>
                        <div className={`flex items-center gap-2`}>
                          <Text size="tx" className="text-gray-700 !font-medium !text-[14px]">
                            {course.averageRating}
                          </Text>
                          <Rate
                            disabled
                            allowHalf
                            className="text-xs text-yellow-500 mr-2 custom-rate"
                            defaultValue={Number(course.averageRating)}
                          />
                          <Text size="xs" className="!text-gray-500">{`(${course.totalReviews})`}</Text>
                        </div>

                        <div className="flex gap-2.5">
                          {course.totalVideoDuration && (
                            <Text size="xs" className="!text-gray-500">
                              {course.totalVideoDuration} video
                            </Text>
                          )}
                          {course.totalArticles > 0 && (
                            <Text size="xs" className="!text-gray-500">
                              {course.totalArticles} articles
                            </Text>
                          )}
                          <Text size="xs" className="!text-gray-500">
                            {course.level}
                          </Text>
                        </div>
                        <Text className="!font-medium !text-teal-secondary">
                          {course.price ? `${course.price}$` : `Free`}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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
