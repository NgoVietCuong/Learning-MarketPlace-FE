import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { Check, Search } from 'lucide-react';
import { Rate } from 'antd';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Command, CommandList, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useCategories from '@/hooks/useCategories';
import { cn } from '@/lib/utils';

interface CoursesProps {
  search: string | null;
  category: string | null;
  level: string | null;
  price: string | null;
}

export default function Courses({ search, category, level, price }: CoursesProps) {
  console.log(search);
  const router = useRouter();
  const { categoryList } = useCategories();

  return (
    <div className="w-full h-full bg-slate-100">
      <div className="container w-full h-300px">
        <div className="container flex flex-col mx-auto gap-16 px-16 py-10">
          <div className="flex justify-center items-center gap-2">
            <Input
              type="text"
              placeholder="Filter courses..."
              prefix={<Search size={16} color="#6b7280" />}
              className=" w-1/2 !bg-white-primary"
            />
            <Button>Search</Button>
          </div>
        </div>
      </div>
      <div className="container h-full flex flex-col mx-auto gap-16 px-16 py-10">
        <div className="w-full h-full flex gap-5">
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
            {/* <div className="w-full h-full flex justify-center items-center">
              <Text size='s'>No courses found</Text>
            </div> */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Img
                    className="max-w-[256px]"
                    src={
                      'https://res.cloudinary.com/dvz7322mp/image/upload/v1716472694/hlm-dev/course-image/3/dswbkusmxo5z0zodpjbn.jpg'
                    }
                    alt="course image"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-0.5">
                      <Text size="sm" className="!font-medium !text-gray-700 !text-[15px]">
                        Javascript for beginner 2024
                      </Text>
                      <Text size="tx" className="!text-gray-700 !text-[13.5px]">
                        Learn javascript online and supercharge your web design with this Javascript for beginners
                        training course.
                      </Text>
                      <Text size="xs">Ngo Cuong</Text>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <Text size="tx" className="text-gray-700 !font-medium !text-[14px]">
                          3.4
                        </Text>
                        <Rate
                          disabled
                          allowHalf
                          className="text-xs text-yellow-500 mr-2 custom-rate"
                          defaultValue={3}
                        />
                        <Text size="xs" className="!text-gray-500">{`(399)`}</Text>
                      </div>
                      <div className="flex gap-2.5">
                        {/* {course.totalVideoDuration && ( */}
                        <Text size="xs" className="!text-gray-600">
                          2 video
                        </Text>
                        {/* )} */}
                        {/* {course.totalArticles > 0 && ( */}
                        <Text size="xs" className="!text-gray-600">
                          3 articles
                        </Text>
                        {/* )} */}
                        <Text size="xs" className="!text-gray-600">
                          Basic
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>

                <Text className="!font-medium !text-teal-500 !text-[15px]">12$</Text>
              </div>
              <Separator className="bg-slate-300" />
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Img
                    className="max-w-[256px]"
                    src={
                      'https://res.cloudinary.com/dvz7322mp/image/upload/v1716472694/hlm-dev/course-image/3/dswbkusmxo5z0zodpjbn.jpg'
                    }
                    alt="course image"
                  />
                  <div className="flex flex-col gap-1">
                    <Text size="sm" className="!font-medium !text-gray-700 !text-[15px]">
                      Javascript for beginner 2024
                    </Text>
                    <Text size="tx" className="!text-gray-700 !text-[13.5px]">
                      Learn javascript online and supercharge your web
                    </Text>
                    <Text size="xs">Ngo Cuong</Text>
                    <div className={`flex items-center gap-2`}>
                      <Text size="tx" className="text-gray-700 !font-medium !text-[14px]">
                        3.4
                      </Text>
                      <Rate disabled allowHalf className="text-xs text-yellow-500 mr-2 custom-rate" defaultValue={3} />
                      <Text size="xs" className="!text-gray-500">{`(399)`}</Text>
                    </div>

                    <div className="flex gap-2.5">
                      {/* {course.totalVideoDuration && ( */}
                      <Text size="xs" className="!text-gray-500">
                        2 video
                      </Text>
                      {/* )} */}
                      {/* {course.totalArticles > 0 && ( */}
                      <Text size="xs" className="!text-gray-500">
                        3 articles
                      </Text>
                      {/* )} */}
                      <Text size="xs" className="!text-gray-500">
                        Basic
                      </Text>
                    </div>
                  </div>
                </div>

                <Text className="!font-medium !text-teal-500 !text-[15px]">12$</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { search, category, level, price } = query;

  return {
    props: {
      search: search || null,
      category: category || null,
      level: level || null,
      price: price || null,
    },
  };
}
