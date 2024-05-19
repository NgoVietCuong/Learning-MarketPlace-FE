import { useRouter } from 'next/router';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useToast } from '@/components/ui/use-toast';
import CategoryButton from '@/components/ui/category-button';
import InstructorLayout from '@/components/layout/instructor-layout';
import FailedAlert from '@/components/alert/Failed';
import { axiosClient } from '@/services/axios';
import { Response } from '@/types/response';
import { CategoryList } from '@/types/schema';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';

interface InstructorCreateCourseProps {
  categories: CategoryList;
}

const unknownCategoryId = 14;

export default function InstructorCreateCourse({ categories }: InstructorCreateCourseProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleChooseCategories = (id: number) => {
    setCategoryIds((preCategoryIds: number[]) => {
      if (preCategoryIds.includes(id)) {
        return preCategoryIds.filter((categoryId) => categoryId !== id);
      } else if (preCategoryIds.length === 3) {
        return preCategoryIds;
      } else if (id === unknownCategoryId || preCategoryIds.includes(unknownCategoryId)) {
        return [unknownCategoryId];
      } else {
        return [...preCategoryIds, id];
      }
    });
  };

  const handleCreateCourse = async () => {
    setSaving(true);
    const createCourseResponse = await instructorCourseApi.createCourse({ title, categoryIds });
    if (createCourseResponse.error) {
      setSaveError(createCourseResponse.message);
    } else {
      const courseId = createCourseResponse.data!.id;
      router.push(`/instructor/courses/${courseId}`);
      toast({
        variant: 'success',
        description: `Created course successfully!`,
      });
    }
    setSaving(false);
  };

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl overflow-scroll">
        <div className="w-full h-full flex justify-center items-center">
          <div className="max-w-[45%] flex flex-col gap-5">
            <div className="flex flex-col gap-0.5">
              <Heading size="4xl" className="text-gray-700 !font-medium">
                Name your course
              </Heading>
              <Text size="sm">What would you like to name your course? Don't worry, you can change it later.</Text>
            </div>

            <div className="flex flex-col gap-1 mb-[25px]">
              <Text size="sm" className="font-medium !text-gray-600">
                Course Title
              </Text>
              <Input
                type="text"
                size="sm"
                placeholder="Enter course title"
                onChange={(value: string) => setTitle(value)}
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <Heading size="4xl" className="text-gray-700 !font-medium">
                Choose categories
              </Heading>
              <Text size="sm">You need to choose at least 1 category and maximum 3 categories.</Text>
            </div>

            <div className="w-full flex flex-wrap gap-2">
              {categories.map((category) => (
                <CategoryButton
                  className="text-gray-500"
                  key={category.id}
                  category={category.name}
                  isSelected={categoryIds.includes(category.id)}
                  onClick={() => handleChooseCategories(category.id)}
                />
              ))}
            </div>

            <div className="w-[50%] flex flex-col items-center p-0">
              {saveError && <FailedAlert title={'Create course failed'} message={saveError} />}
            </div>

            <div className="flex gap-1 mt-[10px]">
              <Button
                size="sm"
                variant="ghost"
                className="text-slate-700"
                onClick={() => router.push('/instructor/courses')}
              >
                Cancel
              </Button>
              <Button
                disabled={!(title.trim() && categoryIds.length)}
                size="base"
                className="text-white-primary bg-teal-secondary active:scale-[98%] px-[15px]"
                onClick={handleCreateCourse}
              >
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const categoryReponse: Response<CategoryList> = await axiosClient.get(`${process.env.SERVER_URL}/category/list`);
  return {
    props: {
      categories: categoryReponse.data,
    },
  };
}

InstructorCreateCourse.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
