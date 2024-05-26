import dynamic from 'next/dynamic';
import { useState, Dispatch, SetStateAction } from 'react';
import { Loader2, Upload, ImageOff, SquarePlay } from 'lucide-react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CategoryButton } from '@/components/ui/category-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FailedAlert from '@/components/alert/Failed';
import AddCategory from '@/components/combobox/AddCategory';
import useCategories from '@/hooks/useCategories';
import useCourseDetails from '@/hooks/useCourseDetails';
import { uploadApi } from '@/services/axios/uploadApi';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';
import { Course, CategoryList } from '@/types/schema';
import { UnknownCategoryId } from '@/constants/common';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface CourseInfoProps {
  courseInfo: Omit<Course, 'isPublished'>;
  setCourseInfo: Dispatch<SetStateAction<Omit<Course, 'isPublished'> | null>>;
  isChanged: boolean;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

export default function CourseInfo({ courseInfo, setCourseInfo, isChanged, setIsChanged }: CourseInfoProps) {
  const { toast } = useToast();
  const { categoryList } = useCategories();
  const { courseDetailsMutate } = useCourseDetails(courseInfo.id);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [levelError, setLevelError] = useState('');
  const [overviewError, setOverviewError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

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

  const handleSaveCourseInfo = async () => {
    let hasTitleError = false,
      hasOverviewError = false,
      hasDescriptionError = false,
      hasPriceError = false,
      hasLevelError = false,
      hasCategoryError = false;

    const { id, title, overview, description, price, level, categories, imagePreview, videoPreview } = courseInfo!;

    if (!title || (title && title.trim() === '')) (hasTitleError = true), setTitleError('Course title cannot be empty');
    else (hasTitleError = false), setTitleError('');

    if (!overview || (overview && overview.trim() === ''))
      (hasOverviewError = true), setOverviewError('Course overview cannot be empty');
    else (hasOverviewError = false), setOverviewError('');

    if (
      !description ||
      (description && ['<h1><br></h1>', '<h2><br></h2>', '<h3><br></h3>', '<p><br></p>'].includes(description))
    )
      (hasDescriptionError = true), setDescriptionError('Biography cannot be empty');
    else (hasDescriptionError = false), setDescriptionError('');

    if (price == null || (typeof price === 'number' && price < 0))
      (hasPriceError = true), setPriceError('Course price cannot be empty');
    else (hasPriceError = false), setPriceError('');

    if (!level) (hasLevelError = true), setLevelError('Course level cannot be empty');
    else (hasCategoryError = false), setLevelError('');

    if (!categories.length || (categories.length && categories.map((c) => c.id).includes(UnknownCategoryId)))
      (hasCategoryError = true), setCategoryError('Course categories cannot be empty');
    else (hasCategoryError = false), setCategoryError('');

    setSaveError('');
    if (hasTitleError || hasOverviewError || hasDescriptionError || hasPriceError || hasLevelError || hasCategoryError)
      return;

    setSaving(true);
    const saveCourseInfoResponse = await instructorCourseApi.updateCourse(id, {
      title: title as string,
      overview: overview as string,
      description: description as string,
      price: price as number,
      level: level as string,
      categoryIds: categories.map((c) => c.id) as number[],
      imagePreview: imagePreview,
      videoPreview: videoPreview,
    });

    if (saveCourseInfoResponse.error) {
      const messages = saveCourseInfoResponse.message;
      if (typeof messages === 'string') setSaveError(messages);
      else setSaveError(messages[0]);
    } else {
      courseDetailsMutate();
      toast({
        variant: 'success',
        description: 'Updated course successfully!',
      });
      setIsChanged(false);
    }
    setSaving(false);
  };

  return (
    <>
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
            {titleError && (
              <Text size="xs" as="p" className="text-red-400 font-medium">
                {titleError}
              </Text>
            )}
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
            {overviewError && (
              <Text size="xs" as="p" className="text-red-400 font-medium">
                {overviewError}
              </Text>
            )}
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
            {descriptionError && (
              <Text size="xs" as="p" className="text-red-400 font-medium mt-[40px]">
                {descriptionError}
              </Text>
            )}
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
            {priceError && (
              <Text size="xs" as="p" className="text-red-400 font-medium">
                {priceError}
              </Text>
            )}
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <Text size="sm" className="font-medium !text-gray-600">
              Level<span className="text-red-500"> *</span>
            </Text>
            <Select value={courseInfo?.level ? courseInfo?.level : undefined} onValueChange={handleChangeLevel}>
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
            {levelError && (
              <Text size="xs" as="p" className="text-red-400 font-medium">
                {levelError}
              </Text>
            )}
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <Text size="sm" className="font-medium !text-gray-600">
              Categories<span className="text-red-500"> *</span>
            </Text>
            {categoryList && courseInfo && (
              <div className="w-full flex flex-wrap gap-2">
                <AddCategory
                  categories={categoryList.data!.filter((category) => category.id !== UnknownCategoryId)}
                  selectedCategories={courseInfo?.categories!.filter((category) => category.id !== UnknownCategoryId)}
                  handleSelectCategory={handleChangeCategories}
                />
                {courseInfo?.categories
                  .filter((category) => category.id !== UnknownCategoryId)
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
            {categoryError && (
              <Text size="xs" as="p" className="text-red-400 font-medium">
                {categoryError}
              </Text>
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
              {imageUploading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
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
              {videoUploading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
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
        <div className="w-[32%] flex flex-col items-center p-0">
          {saveError && <FailedAlert title={'Update course info failed'} message={saveError} />}
        </div>
        <Button
          size="sm"
          disabled={!isChanged || saving}
          className="w-[80px] bg-teal-secondary text-white-primary active:scale-95"
          onClick={handleSaveCourseInfo}
        >
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </>
  );
}
