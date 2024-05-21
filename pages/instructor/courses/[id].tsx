import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Loader2, Trash2, Upload, ImageOff, SquarePlay } from 'lucide-react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { CategoryButton } from '@/components/ui/category-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FailedAlert from '@/components/alert/Failed';
import AddCategory from '@/components/combobox/AddCategory';
import InstructorLayout from '@/components/layout/instructor-layout';
import CourseInfoSkeleton from '@/components/skeleton/CourseInfoSkeleton';
import DeleteAction from '@/components/modal/DeleteAction';
import useCategories from '@/hooks/useCategories';
import useCourseDetails from '@/hooks/useCourseDetails';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';
import { Course, CategoryList } from '@/types/schema';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface InstructorCourseDetailsProps {
  id: number;
}

export default function InstructorCourseDetails({ id }: InstructorCourseDetailsProps) {
  const { categoryList } = useCategories();
  const { courseDetails, isLoading, courseDetailsMutate } = useCourseDetails(id);
  const [isChanged, setIsChanged] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [courseInfo, setCourseInfo] = useState<Course | null>(null);

  console.log('courseInfo', courseInfo);

  useEffect(() => {
    if (courseDetails) {
      const { sections, ...rest } = courseDetails.data!;
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

  const handleChangePrice = (value: number) => {
    setCourseInfo({ ...courseInfo!, price: value });
  };

  const handleChangeCategories = (value: CategoryList) => {
    setCourseInfo({ ...courseInfo!, categories: value });
  }

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl overflow-scroll">
        <div className="px-10 py-8 flex flex-col gap-4">
          {isLoading ? (
            <CourseInfoSkeleton />
          ) : (
            <>
              <div className="flex justify-between">
                <Heading className="!font-medium">Courses Details</Heading>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant={'outline'} className="p-[15px]">
                    Publish
                  </Button>
                  {/* <Button size="sm" variant={'destructive'} className="p-2">
                    <Trash2 className="w-[17px] h-[17px]" />
                  </Button> */}
                  <DeleteAction
                    title={'Delete Course?'}
                    object={'course'}
                    mutate={courseDetailsMutate}
                    apiHandler={() => instructorCourseApi.deleteCourse(id)}
                  />
                </div>
              </div>
              <Tabs defaultValue="Course Info" className="w-full">
                <TabsList className="bg-teal-secondary py-2 mb-2">
                  <TabsTrigger value="Course Info">Course Info</TabsTrigger>
                  <TabsTrigger value="Sections">Sections</TabsTrigger>
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
                        {(categoryList && courseInfo) && (
                          <div className="w-full flex flex-wrap gap-2">
                            <AddCategory
                              categories={categoryList.data!.filter((category) => category.id !== 14)}
                              selectedCategories={courseInfo?.categories!}
                              
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
                        <input type="file" id="course_image" />
                        <Label
                          htmlFor="course_image"
                          className="w-full bg-white font-normal border border-gray-border border-dashed rounded-md h-[36px] flex items-center px-4 text-gray-primary"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Select an image
                        </Label>
                        <div className="w-full flex h-[220px] bg-slate-200 justify-center items-center rounded-md">
                          <ImageOff className="w-28 h-28 text-gray-400" />
                        </div>
                      </div>
                      <div className="w-full flex flex-col items-start gap-1">
                        <Text size="sm" className="font-medium !text-gray-600">
                          Course video
                        </Text>
                        <input type="file" id="course_video" />
                        <Label
                          htmlFor="course_video"
                          className="w-full bg-white font-normal border border-gray-border border-dashed rounded-md h-[36px] flex items-center px-4 text-gray-primary"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Select a video
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
