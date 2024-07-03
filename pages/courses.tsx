import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Check, Search, Loader2 } from 'lucide-react';
import { Rate } from 'antd';
import { cn } from '@/lib/utils';
import { ParsedUrlQueryInput } from 'querystring';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Command, CommandList, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useCategories from '@/hooks/fetch-data/useCategories';
import useCourseExplorerList from '@/hooks/fetch-data/useCourseExplorer';
import { UnknownCategoryId } from '@/constants/common';

interface CoursesProps {
  search: string | null;
  categoryId: string | null;
  level: string | null;
  price: string | null;
  page: string | null;
}

interface Query extends ParsedUrlQueryInput {
  search?: string;
  categoryId?: string;
  level?: string;
  price?: string;
  page?: string;
}

export default function Courses({ search, categoryId, level, price, page }: CoursesProps) {
  const router = useRouter();
  const { categoryList } = useCategories();
  const [searchValue, setSearchValue] = useState(search);
  const { courseExplorerList, isLoading } = useCourseExplorerList(search, categoryId, level, price, page);

  const handleSearchCourse = (value: string | null) => {
    if (value && value.trim()) router.push(`/courses?search=${value}`);
    else router.push('/courses');
  };

  const handleChooseLevel = (value: string) => {
    const query: Query = {};
    if (search) query.search = search;
    if (value !== level) query.level = value;
    if (categoryId) query.categoryId = categoryId;
    if (price) query.price = price;
    router.push({
      pathname: '/courses',
      query: query,
    });
  };

  const handleChoosePrice = (value: string) => {
    const query: Query = {};
    if (search) query.search = search;
    if (level) query.level = level;
    if (categoryId) query.categoryId = categoryId;
    if (value !== price) query.price = value;
    router.push({
      pathname: '/courses',
      query: query,
    });
  };

  const handleChooseCategory = (value: string) => {
    const query: Query = {};
    if (search) query.search = search;
    if (level) query.level = level;
    if (value !== categoryId) query.categoryId = value;
    if (price) query.price = price;
    router.push({
      pathname: '/courses',
      query: query,
    });
  };

  const handleChangePage = (value: number) => {
    const query: Query = {};
    if (search) query.search = search;
    if (level) query.level = level;
    if (categoryId) query.categoryId = categoryId;
    if (price) query.price = price;
    if (value.toString() !== page) query.page = value.toString();
    else query.page = page;
    router.push({
      pathname: '/courses',
      query: query,
    });
  };

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
                value={searchValue ? searchValue : undefined}
                onChange={(value: string) => setSearchValue(value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchCourse(searchValue)
                }}
              />
              <Button className="!h-[38px] bg-sky-600" onClick={() => handleSearchCourse(searchValue)}>
                Search
              </Button>
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
                    <CommandItem className="text-[13px]" onSelect={handleChooseLevel}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                          level === 'Beginner' ? 'text-teal-500' : 'text-white-primary',
                        )}
                      />
                      Beginner
                    </CommandItem>
                    <CommandItem className="text-[13px]" onSelect={handleChooseLevel}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                          level === 'Intermediate' ? 'text-teal-500' : 'text-white-primary',
                        )}
                      />
                      Intermediate
                    </CommandItem>
                    <CommandItem className="text-[13px]" onSelect={handleChooseLevel}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                          level === 'Advanced' ? 'text-teal-500' : 'text-white-primary',
                        )}
                      />
                      Advanced
                    </CommandItem>
                    <CommandItem className="text-[13px]" onSelect={handleChooseLevel}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 border bg-white-primary border-slate-300 rounded-[2px]',
                          level === 'All levels' ? 'text-teal-500' : 'text-white-primary',
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
                    <CommandItem className="text-[13px]" onSelect={handleChoosePrice}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                          price === 'Free' ? 'text-teal-500' : 'text-white-primary',
                        )}
                      />
                      Free
                    </CommandItem>
                    <CommandItem className="text-[13px]" onSelect={handleChoosePrice}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                          price === 'Paid' ? 'text-teal-500' : 'text-white-primary',
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
                      categoryList!
                        .data!.filter((category) => category.id !== UnknownCategoryId)
                        .map((category) => (
                          <CommandItem
                            key={category.id}
                            value={category.id.toString()}
                            className="text-[13px]"
                            onSelect={handleChooseCategory}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]',
                                categoryId === category.id.toString() ? 'text-teal-500' : 'text-white-primary',
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
              <div className="w-full flex justify-center items-center">
                <Loader2 className="h-10 w-10 animate-spin" />
              </div>
            )}
            {courseExplorerList && courseExplorerList.data?.items?.length! === 0 && (
              <div className="w-full flex justify-center items-center">
                <Text size="s">No courses found</Text>
              </div>
            )}
            {courseExplorerList && courseExplorerList.data?.items?.length! > 0 && (
              <div className="flex flex-col gap-4">
                {courseExplorerList.data?.items?.map((course, index) => (
                  <>
                    <div
                      key={course.id}
                      className="flex justify-between cursor-pointer gap-5"
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
                              <Text size="xs" className="!text-gray-500">
                                ({course.totalReviews})
                              </Text>
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
                      <Text className="!font-medium !text-teal-500 !text-[15px]">
                        {course.price ? `$${course.price}` : 'Free'}
                      </Text>
                    </div>
                    {index + 1 < courseExplorerList.data?.items?.length! && <Separator className="bg-slate-200" />}
                  </>
                ))}
              </div>
            )}
            {courseExplorerList && courseExplorerList.data?.meta?.totalPages! > 1 && (
              <Pagination className="mt-7">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={`${!page || page === '1' ? 'pointer-events-none opacity-30' : ''} cursor-pointer`}
                      onClick={() => handleChangePage(Number(page) - 1)}
                    />
                  </PaginationItem>
                  {page && Number(page) >= 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink className='underline'>{page ? page : 1}</PaginationLink>
                  </PaginationItem>
                  {(!page ||
                    page === '1' ||
                    (page && courseExplorerList.data?.meta?.totalPages! - Number(page!) > 1)) && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      className={`${page && Number(page) === courseExplorerList.data?.meta?.totalPages ? 'pointer-events-none opacity-30' : ''} cursor-pointer`}
                      onClick={() => handleChangePage(page ? Number(page) + 1 : 2)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { search, categoryId, level, price, page } = query;

  return {
    props: {
      search: search || null,
      categoryId: categoryId || null,
      level: level || null,
      price: price || null,
      page: page || null,
    },
  };
}
