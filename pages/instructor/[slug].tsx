import { GetServerSidePropsContext } from 'next';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import useInstructorSlug from '@/hooks/useInstructorSlug';

interface InstructorInfoProps {
  slug: string;
}

export default function InstructorInfo({ slug }: InstructorInfoProps) {
  const { instructorSlugInfo, instructorSlugLoading } = useInstructorSlug(slug);

  return (
    <div className="w-full h-full">
      {instructorSlugLoading ? (
        <></>
      ) : (
        <div className="w-full h-full bg-white-primary">
          <div className="w-full p-0">
            <div className="container px-20 py-14 space-y-10">
              <div className="space-y-3 w-3/5">
                <Heading size="4xl" className="!font-semibold !text-gray-800">
                  About me
                </Heading>
                <div
                  className="description text-[14px]"
                  dangerouslySetInnerHTML={{ __html: instructorSlugInfo?.data?.biography || '' }}
                ></div>
              </div>

              <div className="space-y-3 w-3/5">
                <Heading size="4xl" className="!font-semibold !text-gray-800">
                  My courses
                </Heading>
                <div className="w-full flex flex-wrap gap-x-8 gap-y-6">
                  {instructorSlugInfo?.data?.courses.map((course) => (
                    <div
                      key={course.id}
                      className="max-w-[300px] bg-white overflow-hidden rounded-md space-y-3 shadow-md cursor-pointer"
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
