import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WarningAlert from '@/components/alert/Warning';
import InstructorLayout from '@/components/layout/instructor-layout';
import CourseInfoSkeleton from '@/components/skeleton/CourseInfoSkeleton';
import DeleteAction from '@/components/modal/DeleteAction';
import useCourseList from '@/hooks/useCourseList';
import useCourseDetails from '@/hooks/useCourseDetails';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';
import { Course, Section } from '@/types/schema';
import CourseInfo from '@/components/course-details/CourseInfo';
import SectionList from '@/components/course-details/SectionList';

interface InstructorCourseDetailsProps {
  id: number;
}

export default function InstructorCourseDetails({ id }: InstructorCourseDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { courseListMutate } = useCourseList();
  const { courseDetails, isLoading, courseDetailsMutate } = useCourseDetails(id);
  const [open, setOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publish, setPublish] = useState<boolean | null>(null);
  const [courseInfo, setCourseInfo] = useState<Omit<Course, 'isPublished'> | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    if (courseDetails) {
      const { sections, isPublished, ...rest } = courseDetails.data!;
      setPublish(isPublished);
      setSections(sections);
      setCourseInfo(rest);
    }
  }, [courseDetails]);

  useEffect(() => {
    if (courseInfo && courseDetails) {
      const changed = !(Object.keys(courseInfo) as (keyof Omit<Course, 'isPublished'>)[]).every(
        (key) => courseInfo[key] == courseDetails.data![key],
      );
      setIsChanged(changed);
    }
  }, [courseInfo]);

  const handlePublishCourse = async () => {
    setPublishing(true);
    const publishResponse = await instructorCourseApi.updatePublishCourse(courseInfo!.id, {
      isPublished: !publish,
    });
    if (!publishResponse.error) {
      courseDetailsMutate();
      toast({
        variant: 'success',
        description: `${publish ? 'Unpublished' : 'Published'} course successfully!`,
      });
      setPublish(!publish);
    }
    setPublishing(false);
  };

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] max-h-[95%] shadow-lg rounded-xl overflow-y-scroll">
        <div className="px-10 py-8 flex flex-col gap-4">
          {isLoading ? (
            <CourseInfoSkeleton />
          ) : (
            <>
              {!publish && (
                <WarningAlert message={'This course is unpublished. It will not be visible for everyone.'} />
              )}
              <div className="w-full flex flex-col items-start">
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-0 text-gray-400 hover:text-gray-700"
                  onClick={() => router.push(`/instructor/courses`)}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to course list
                </Button>
                <div className="w-full flex justify-between">
                  <Heading className="!font-medium">{publish ? 'Course Details' : 'Course Setup'}</Heading>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={'outline'}
                      className="p-[15px]"
                      disabled={publishing}
                      onClick={handlePublishCourse}
                    >
                      {publishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {publish ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button size="sm" variant={'destructive'} className="p-2" onClick={() => setOpen(!open)}>
                      <Trash2 className="w-[17px] h-[17px]" />
                    </Button>
                    <DeleteAction
                      title={'Delete Course?'}
                      object={'course'}
                      open={open}
                      setOpen={setOpen}
                      mutate={courseListMutate}
                      redirect={true}
                      redirectUrl={`/instructor/courses`}
                      apiHandler={() => instructorCourseApi.deleteCourse(id)}
                    />
                  </div>
                </div>
              </div>
              <Tabs defaultValue="Course Info" className="w-full">
                <TabsList className="bg-slate-200 py-2 mb-2">
                  <TabsTrigger value="Course Info" className="px-4">
                    Course Info
                  </TabsTrigger>
                  <TabsTrigger value="Sections" className="px-4">
                    Sections
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="Course Info" className="flex flex-col gap-3">
                  {courseInfo && (
                    <CourseInfo
                      courseInfo={courseInfo!}
                      setCourseInfo={setCourseInfo}
                      isChanged={isChanged}
                      setIsChanged={setIsChanged}
                    />
                  )}
                </TabsContent>
                <TabsContent value="Sections" className="flex flex-col gap-3">
                  {sections && <SectionList sections={sections} courseId={id} />}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { id },
  } = context;

  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    return {
      redirect: {
        destination: '/instructor/courses',
        permanent: false,
      },
    };
  }

  return {
    props: {
      id: idNumber,
    },
  };
}

InstructorCourseDetails.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
