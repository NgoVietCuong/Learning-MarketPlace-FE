import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Loader2, Trash2, Upload, ImageOff, SquarePlay, TriangleAlert } from 'lucide-react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useToast } from '@/components/ui/use-toast';
import { CategoryButton } from '@/components/ui/category-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FailedAlert from '@/components/alert/Failed';
import WarningAlert from '@/components/alert/Warning';
import AddCategory from '@/components/combobox/AddCategory';
import InstructorLayout from '@/components/layout/instructor-layout';
import CourseInfoSkeleton from '@/components/skeleton/CourseInfoSkeleton';
import DeleteAction from '@/components/modal/DeleteAction';
import useCategories from '@/hooks/useCategories';
import useCourseList from '@/hooks/useCourseList';
import useCourseDetails from '@/hooks/useCourseDetails';
import { uploadApi } from '@/services/axios/uploadApi';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';
import { Course, CategoryList } from '@/types/schema';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface InstructorCourseDetailsProps {
  id: number;
}

export default function InstructorCourseDetails({ id }: InstructorCourseDetailsProps) {
  const { toast } = useToast();
  const { categoryList } = useCategories();
  const { courseListMutate } = useCourseList();
  const { courseDetails, isLoading, courseDetailsMutate } = useCourseDetails(id);
  const [open, setOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [publish, setPublish] = useState<boolean | null>(null);
  const [courseInfo, setCourseInfo] = useState<Omit<Course, 'isPublished'> | null>(null);

  console.log('courseInfo', courseInfo);

  useEffect(() => {
    if (courseDetails) {
      const { sections, isPublished, ...rest } = courseDetails.data!;
      setPublish(isPublished);
      setCourseInfo(rest);
    }
  }, [isLoading]);

  const handleChangeCourseTitle = (value: string) => {
    setCourseInfo({ ...courseInfo!, title: value });
  };

  const handleChangeOverview = (value: string) => {
    setCourseInfo({ ...courseInfo!, overview: value });
  };

  const handleChangeDescription = (value: string) => {
    setCourseInfo({ ...courseInfo!, description: value });
  };

  const handleChangeLevel = (value: string) => {
    setCourseInfo({ ...courseInfo!, level: value });
  };

  const handleChangePrice = (value: string) => {
    let newValue = parseFloat(value);
    setCourseInfo({ ...courseInfo!, price: newValue && newValue > 0 ? parseFloat(newValue.toFixed(2)) : null });
  };

  const handleChangeCategories = (value: CategoryList) => {
    setCourseInfo({ ...courseInfo!, categories: value });
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    formData.append('public_id_prefix', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}/course-image/${courseInfo?.id}`);

    setImageUploading(true);
    const uploadResponse = await uploadApi.uploadImage(formData);
    if (!uploadResponse.error) {
      setSelectedImage(file);
      setCourseInfo({ ...courseInfo!, imagePreview: uploadResponse.secure_url as string });
    }
    setImageUploading(false);
  };

  const handleChangeVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    formData.append('public_id_prefix', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}/course-video/${courseInfo?.id}`);

    setVideoUploading(true);
    const uploadResponse = await uploadApi.uploadVideo(formData);
    if (!uploadResponse.error) {
      setSelectedVideo(file);
      setCourseInfo({ ...courseInfo!, videoPreview: uploadResponse.secure_url as string });
    }
    setVideoUploading(false);
  };


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
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl overflow-scroll">
        <div className="px-10 py-8 flex flex-col gap-4">
          {isLoading ? (
            <CourseInfoSkeleton />
          ) : (
            <>
              {!publish && (
                <WarningAlert message={'This course is unpublished. It will not be visible for everyone.'} />
              )}
              <div className="flex justify-between">
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
                    apiHandler={() => instructorCourseApi.deleteCourse(id)}
                  />
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
                  <div className="flex gap-7 justify-between py-3">
                    <div className="w-[32%] flex flex-col gap-4">
                      <div className="w-full flex flex-col items-start gap-1">
                        <Text size="sm" className="font-medium !text-gray-600">
                          Course title<span className="text-red-500"> *</span>
                        </Text>
                        <Input
                          size="sm"
                          type="text"
                          placeholder="Enter course title"
                          className="mb-[5px] pr-[100px]"
                          value={courseInfo?.title ? courseInfo?.title : undefined}
                          onChange={handleChangeCourseTitle}
                        />
                      </div>
                      <div className="w-full flex flex-col items-start gap-1">
                        <Text size="sm" className="font-medium !text-gray-600">
                          Overview<span className="text-red-500"> *</span>
                        </Text>
                        <Input
                          size="sm"
                          type="text"
                          placeholder="Enter course overview"
                          className="mb-[5px] pr-[100px]"
                          value={courseInfo?.overview ? courseInfo?.overview : undefined}
                          onChange={handleChangeOverview}
                        />
                      </div>
                      <div className="w-full flex flex-col items-start gap-1">
                        <Text size="sm" className="font-medium !text-gray-600">
                          Description<span className="text-red-500"> *</span>
                        </Text>
                        <ReactQuill
                          theme="snow"
                          className="quill w-full"
                          style={{ minHeight: '390px', maxHeight: '390px' }}
                          value={courseInfo?.description ? courseInfo?.description : undefined}
                          onChange={handleChangeDescription}
                        />
                      </div>
                    </div>
                    <div className="w-[31%] flex flex-col gap-4">
                      <div className="w-full flex flex-col items-start gap-1">
                        <Text size="sm" className="font-medium !text-gray-600">
                          Price<span className="text-red-500"> *</span>
                        </Text>
                        <Input
                          size="sm"
                          type="number"
                          placeholder="Enter course price"
                          className="mb-[5px] pr-[100px]"
                          prefix={<BsCurrencyDollar size={16} color="#6b7280" />}
                          value={courseInfo?.price ? courseInfo?.price.toString() : undefined}
                          onChange={handleChangePrice}
                        />
                      </div>
                      <div className="w-full flex flex-col items-start gap-1">
                        <Text size="sm" className="font-medium !text-gray-600">
                          Level<span className="text-red-500"> *</span>
                        </Text>
                        <Select
                          value={courseInfo?.level ? courseInfo?.level : undefined}
                          onValueChange={handleChangeLevel}
                        >
                          <SelectTrigger className="w-full px-4">
                            <SelectValue placeholder="Select course level" />
                          </SelectTrigger>
                          <SelectContent className="bg-white-primary">
                            <SelectItem value="Basic" className="text-gray-700">
                              Basic
                            </SelectItem>
                            <SelectItem value="Intermediate" className="text-gray-700">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced" className="text-gray-700">
                              Advanced
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full flex flex-col items-start gap-1">
                        <Text size="sm" className="font-medium !text-gray-600">
                          Categories<span className="text-red-500"> *</span>
                        </Text>
                        {categoryList && courseInfo && (
                          <div className="w-full flex flex-wrap gap-2">
                            <AddCategory
                              categories={categoryList.data!.filter((category) => category.id !== 14)}
                              selectedCategories={courseInfo?.categories!}
                              handleSelectCategory={handleChangeCategories}
                            />
                            {courseInfo?.categories
                              .filter((category) => category.id !== 14)
                              .map((category) => (
                                <CategoryButton
                                  className="text-gray-500"
                                  key={category.id}
                                  isSelected={true}
                                  category={category.name}
                                  onClick={() => {}}
                                />
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-[32%] flex flex-col gap-4">
                      <div className="w-full flex flex-col items-start gap-1">
                        <Text size="sm" className="font-medium !text-gray-600">
                          Course image
                        </Text>
                        <input
                          type="file"
                          id="course_image"
                          accept="image/png, image/gif, image/jpeg, image/jpg"
                          disabled={imageUploading}
                          onChange={handleChangeImage}
                        />
                        <Label
                          htmlFor="course_image"
                          className="w-full bg-white font-normal border border-gray-border border-dashed rounded-md h-[36px] flex items-center px-4 text-gray-primary"
                        >
                          {imageUploading ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4 mr-2" />
                          )}
                          {imageUploading
                            ? 'Uploading...'
                            : !selectedImage
                              ? 'Select an image'
                              : selectedImage.name.length > 15
                                ? `${selectedImage.name.substring(0, 14)}...`
                                : selectedImage.name}
                        </Label>
                        <div className="w-full flex h-[220px] bg-slate-200 justify-center items-center rounded-md">
                          <ImageOff className="w-28 h-28 text-gray-400" />
                        </div>
                      </div>
                      <div className="w-full flex flex-col items-start gap-1">
                        <Text size="sm" className="font-medium !text-gray-600">
                          Course video
                        </Text>
                        <input
                          type="file"
                          id="course_video"
                          disabled={videoUploading}
                          accept="video/mp4,video/x-m4v,video/*"
                          onChange={handleChangeVideo}
                        />
                        <Label
                          htmlFor="course_video"
                          className="w-full bg-white font-normal border border-gray-border border-dashed rounded-md h-[36px] flex items-center px-4 text-gray-primary"
                        >
                          {videoUploading ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4 mr-2" />
                          )}
                          {videoUploading
                            ? 'Uploading...'
                            : !selectedVideo
                              ? 'Select a video'
                              : selectedVideo.name.length > 15
                                ? `${selectedVideo.name.substring(0, 14)}...`
                                : selectedVideo.name}
                        </Label>
                        <div className="w-full flex h-[240px] bg-slate-200 justify-center items-center rounded-md">
                          <SquarePlay className="w-28 h-28 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
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

  return {
    props: {
      id,
    },
  };
}

InstructorCourseDetails.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
