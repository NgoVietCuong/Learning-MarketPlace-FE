import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FailedAlert from '@/components/alert/Failed';
import WarningAlert from '@/components/alert/Warning';
import InstructorLayout from '@/components/layout/instructor-layout';
import CourseInfoSkeleton from '@/components/skeleton/CourseInfoSkeleton';
import DeleteAction from '@/components/modal/DeleteAction';
import UploadFile from '@/components/upload/UploadFile';
import UploadVideo from '@/components/upload/UploadVideo';
import useLessonDetails from '@/hooks/useLesson';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';
import { Lesson } from '@/types/schema';
import { NumberOfLessonFields } from '@/constants/common';
import { LessonContentTypes } from '@/constants/enums';
import { uploadApi } from '@/services/axios/uploadApi';
const { DOCUMENT, VIDEO } = LessonContentTypes;
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface InstructorLessonDetailsProps {
  courseId: number;
  lessonId: number;
}

export default function InstructorLessonDetails({ courseId, lessonId }: InstructorLessonDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { lessonDetails, isLoading, lessonDetailsMutate } = useLessonDetails(lessonId);
  const [open, setOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentTypeError, setContentTypeError] = useState('');
  const [fileUploading, setFileUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publish, setPublish] = useState<boolean | null>(null);
  const [numberCompleted, setNumberCompleted] = useState(0);
  const [lessonInfo, setLessonInfo] = useState<Omit<Lesson, 'isPublished'> | null>(null);

  useEffect(() => {
    if (lessonDetails) {
      const { isPublished, ...rest } = lessonDetails.data!;
      setPublish(isPublished);
      setLessonInfo(rest);

      let incompleteFields = 0;
      const { title, contentType, content, fileName } = rest!;

      if (!contentType) incompleteFields++;
      if (!title || (title && title.trim() === '')) incompleteFields++;
      if (!content || (content && content.trim() === '')) incompleteFields++;
      if (contentType && [DOCUMENT, VIDEO].includes(contentType) && (!fileName || (fileName && fileName.trim() === '')))
        incompleteFields++;

      setNumberCompleted(NumberOfLessonFields - incompleteFields);
    }
  }, [lessonDetails]);

  useEffect(() => {
    if (lessonInfo && lessonDetails) {
      const changed = !(Object.keys(lessonInfo) as (keyof Omit<Lesson, 'isPublished'>)[]).every(
        (key) => lessonInfo[key] == lessonDetails.data![key],
      );
      setIsChanged(changed);
    }
  }, [lessonInfo]);

  const handlePublishLesson = async () => {
    setPublishing(true);
    const publishResponse = await instructorCourseApi.updatePublishLesson(lessonInfo!.id, {
      isPublished: !publish,
    });
    if (!publishResponse.error) {
      lessonDetailsMutate();
      toast({
        variant: 'success',
        description: `${publish ? 'Unpublished' : 'Published'} lesson successfully!`,
      });
      setPublish(!publish);
    }
    setPublishing(false);
  };

  const handleChangeLessonTitle = (value: string) => {
    setLessonInfo({ ...lessonInfo!, title: value });
  };

  const handleChangeContentType = (value: LessonContentTypes) => {
    setLessonInfo({ ...lessonInfo!, contentType: value, content: null, fileName: null });
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    formData.append('public_id_prefix', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}/lesson-document/${lessonInfo?.id}`);

    setFileUploading(true);
    const uploadResponse = await uploadApi.uploadFile(formData);
    if (!uploadResponse.error) {
      setSelectedFile(file);
      setLessonInfo({ ...lessonInfo!, content: uploadResponse.secure_url as string, fileName: file.name });
    }
    setFileUploading(false);
  };

  const handleChangeVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    formData.append('public_id_prefix', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}/course-video/${lessonInfo?.id}`);

    setVideoUploading(true);
    const uploadResponse = await uploadApi.uploadVideo(formData);
    if (!uploadResponse.error) {
      console.log("uploadResponse", uploadResponse)
      setSelectedVideo(file);
      setLessonInfo({ ...lessonInfo!, content: uploadResponse.secure_url as string });
    }
    setVideoUploading(false);
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
                <WarningAlert message={'This lesson is unpublished. It will not be visible in the course.'} />
              )}
              <div className="w-full flex flex-col items-start">
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-0 text-gray-400 hover:text-gray-700"
                  onClick={() => router.push(`/instructor/courses/${courseId}`)}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to course
                </Button>
                <div className="w-full flex justify-between">
                  <Heading className="!font-medium">{publish ? 'Lesson Details' : 'Lesson Setup'}</Heading>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={'outline'}
                      className="p-[15px]"
                      disabled={numberCompleted < NumberOfLessonFields || publishing}
                      onClick={handlePublishLesson}
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
                      redirect={true}
                      redirectUrl={`/instructor/courses/${courseId}`}
                      apiHandler={() => instructorCourseApi.deleteCourse(lessonId)}
                    />
                  </div>
                </div>
                <Text size="tx" className="font-medium !text-cyan-600">
                  Complete all required fields ({numberCompleted}/{NumberOfLessonFields})
                </Text>
              </div>
              <div className="flex gap-7 mt-[15px]">
                <div className="w-[32%] flex flex-col gap-3">
                  <div className="w-full flex flex-col items-start gap-1">
                    <Text size="sm" className="font-medium !text-gray-600">
                      Course title<span className="text-red-500"> *</span>
                    </Text>
                    <Input
                      size="sm"
                      type="text"
                      placeholder="Enter course title"
                      className="mb-[5px] pr-[100px]"
                      value={lessonInfo?.title ? lessonInfo?.title : undefined}
                      onChange={handleChangeLessonTitle}
                    />
                    {titleError && (
                      <Text size="xs" as="p" className="text-red-400 font-medium">
                        {titleError}
                      </Text>
                    )}
                  </div>

                  <div className="w-full flex flex-col items-start gap-1">
                    <Text size="sm" className="font-medium !text-gray-600">
                      Content type<span className="text-red-500"> *</span>
                    </Text>
                    <Select
                      value={lessonInfo?.contentType ? lessonInfo?.contentType : undefined}
                      onValueChange={handleChangeContentType}
                    >
                      <SelectTrigger className="w-full px-4">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white-primary">
                        <SelectItem value="text" className="text-gray-700 hover:cursor-pointer hover:bg-gray-100">
                          Text
                        </SelectItem>
                        <SelectItem value="video" className="text-gray-700 hover:cursor-pointer hover:bg-gray-100">
                          Video
                        </SelectItem>
                        <SelectItem value="document" className="text-gray-700 hover:cursor-pointer hover:bg-gray-100">
                          Document
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {contentTypeError && (
                      <Text size="xs" as="p" className="text-red-400 font-medium">
                        {contentTypeError}
                      </Text>
                    )}
                  </div>

                  <div className="w-full flex flex-col items-start gap-1">
                    {lessonInfo?.contentType && (
                      <Text size="sm" className="font-medium !text-gray-600">
                        Content <span className="text-red-500"> *</span>
                      </Text>
                    )}

                    {lessonInfo?.contentType === LessonContentTypes.TEXT && (
                      <ReactQuill
                        theme="snow"
                        className="quill w-full"
                        style={{ minHeight: '300px', maxHeight: '300px' }}
                        value={lessonInfo?.content ? lessonInfo?.content : undefined}
                        // onChange={}
                      />
                    )}
                    {lessonInfo?.contentType === LessonContentTypes.DOCUMENT && (
                      <UploadFile
                        uploading={fileUploading}
                        selectedFile={selectedFile}
                        handleChangeFile={handleChangeFile}
                      />
                    )}
                    {lessonInfo?.contentType === LessonContentTypes.VIDEO && (
                      <UploadVideo
                        uploading={videoUploading}
                        selectedVideo={selectedVideo}
                        handleChangeVideo={handleChangeVideo}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-[32%] flex flex-col items-center p-0">
                  {saveError && <FailedAlert title={'Update course info failed'} message={saveError} />}
                </div>
                <Button
                  size="sm"
                  disabled={!isChanged || saving}
                  className="w-[80px] bg-teal-secondary text-white-primary active:scale-95"
                  // onClick={handleSaveLessonInfo}
                >
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { id, lessonId },
  } = context;

  const courseIdNumber = Number(id);
  const lessonIdNumber = Number(lessonId);

  if (isNaN(courseIdNumber) || isNaN(lessonIdNumber)) {
    return {
      redirect: {
        destination: '/instructor/courses',
        permanent: false,
      },
    };
  }

  return {
    props: {
      courseId: courseIdNumber,
      lessonId: lessonIdNumber,
    },
  };
}

InstructorLessonDetails.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
