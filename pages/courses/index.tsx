import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Check, Search, Loader2 } from 'lucide-react';
import { Rate } from 'antd';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Command, CommandList, CommandGroup, CommandItem } from '@/components/ui/command';
import useCategories from '@/hooks/useCategories';
import useCourseExplorerList from '@/hooks/useCourseExplorer';
import { cn } from '@/lib/utils';

interface CoursesProps {
  search: string | null;
  categoryId: number | null;
  level: string | null;
  price: string | null;
}

export default function Courses({ search, categoryId, level, price }: CoursesProps) {
  const router = useRouter();
  const { categoryList } = useCategories();
  const [levelValue, setLevelValue] = useState(level);
  const [priceValue, setPriceValue] = useState(price);
  const [searchValue, setSearchValue] = useState(search);
  const [categoryValue, setCategoryValue] = useState(categoryId);
  const { courseExplorerList, isLoading } = useCourseExplorerList(search, categoryId, level, price);
  console.log('courseExplorerList', courseExplorerList);

  return (
    <div className="w-full overflow-y-hidden">
      <div className="w-full h-[250px] bg-[url('/images/img_background.jpg')] bg-center">
        <div className="container mx-auto gap-16 px-16 py-10">
          <div className="w-full h-full flex flex-col items-center gap-5">
            <Heading className="text-white-primary !font-medium">Discover our courses</Heading>
            <div className="w-full flex justify-center items-center gap-2">
              <Input
                type="text"
                placeholder="Search courses..."
                prefix={<Search size={16} color="#6b7280" />}
                className="w-1/2 !bg-white-primary border-none"
              />
              <Button className="!h-[38px] bg-sky-600">Search</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container h-full flex flex-col mx-auto gap-16 px-16 py-12">
        <div className="w-full h-full flex gap-6">
          <div className="flex flex-col w-1/4 gap-3">
            <div>
              <Heading size="2xl" className="!font-medium">
                Level
              </Heading>
              <Command>
                <CommandList>
                  <CommandGroup>
                    <CommandItem className="text-[13px]">
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                        )}
                      />
                      Beginner
                    </CommandItem>
                    <CommandItem className="text-[13px]">
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                        )}
                      />
                      Intermidate
                    </CommandItem>
                    <CommandItem className="text-[13px]">
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                        )}
                      />
                      Advanced
                    </CommandItem>
                    <CommandItem className="text-[13px]">
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                        )}
                      />
                      All levels
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            <Separator className="bg-slate-300" />
            <div>
              <Heading size="2xl" className="!font-medium">
                Price
              </Heading>
              <Command>
                <CommandList>
                  <CommandGroup>
                    <CommandItem className="text-[13px]">
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                        )}
                      />
                      Free
                    </CommandItem>
                    <CommandItem className="text-[13px]">
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                        )}
                      />
                      Paid
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            <Separator className="bg-slate-300" />
            <div>
              <Heading size="2xl" className="!font-medium">
                Categories
              </Heading>
              <Command>
                <CommandList>
                  <CommandGroup>
                    {categoryList &&
                      categoryList!.data!.map((category) => (
                        <CommandItem className="text-[13px]">
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
          <div className="w-3/4">
            {isLoading && (
              <div className="w-full h-full flex justify-center items-center">
                <Loader2 className="h-10 w-10 animate-spin" />
              </div>
            )}
            {courseExplorerList && courseExplorerList.data?.items?.length! === 0 && (
              <div className="w-full h-full flex justify-center items-center">
                <Text size="s">No courses found</Text>
              </div>
            )}
            {courseExplorerList && courseExplorerList.data?.items?.length! > 0 && (
              <div className="flex flex-col gap-4">
                {courseExplorerList.data?.items?.map((course, index) => (
                  <>
                    <div
                      key={course.id}
                      className="flex justify-between cursor-pointer"
                      onClick={() => router.push(`/course/${course.slug}`)}
                    >
                      <div className="flex gap-4">
                        <Img className="max-w-[256px] rounded" src={course.imagePreview as string} alt="course image" />
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-0.5">
                            <Text size="sm" className="!font-medium !text-gray-700 !text-[15px]">
                              {course.title}
                            </Text>
                            <Text size="tx" className="!text-gray-700 !text-[13.5px]">
                              {course.overview}
                            </Text>
                            <Text size="xs">{course.profile.displayName}</Text>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <Text size="tx" className="text-gray-700 !font-medium !text-[14px]">
                                {course.averageRating}
                              </Text>
                              <Rate
                                disabled
                                allowHalf
                                className="text-xs text-yellow-500 mr-2 custom-rate"
                                defaultValue={Number(course.averageRating)}
                              />
                              <Text size="xs" className="!text-gray-500">({course.totalReviews})</Text>
                            </div>
                            <div className="flex gap-2.5">
                              {course.totalVideoDuration && (
                                <Text size="xs" className="!text-gray-600">
                                  {course.totalVideoDuration} video
                                </Text>
                              )}
                              {course.totalArticles > 0 && (
                                <Text size="xs" className="!text-gray-600">
                                  {course.totalArticles} articles
                                </Text>
                              )}
                              <Text size="xs" className="!text-gray-600">
                                {course.level}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Text className="!font-medium !text-teal-500 !text-[15px]">12$</Text>
                    </div>
                    {index + 1 < courseExplorerList.data?.items?.length! && <Separator className="bg-slate-200" />}
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { search, categoryId, level, price } = query;

  return {
    props: {
      search: search || null,
      category: categoryId || null,
      level: level || null,
      price: price || null,
    },
  };
}
