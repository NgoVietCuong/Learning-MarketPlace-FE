import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
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
      <div className="container h-full flex flex-col mx-auto gap-5 px-20 py-10">
        <div>
          <Input
            type="text"
            placeholder="Filter courses..."
            prefix={<Search size={16} color="#6b7280" />}
            className="!h-[50px] mb-[5px] pr-[100px] !bg-white-primary"
          />
        </div>

        <div className="w-full h-full flex gap-5">
          <div className="flex flex-col w-1/4 gap-3">
            <div>
              <Heading size="2xl" className="!font-medium">
                Level
              </Heading>
              <Command>
                <CommandList>
                  <CommandGroup>
                    <CommandItem className='text-[13px]'><Check className={cn('mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]')} />Beginner</CommandItem>
                    <CommandItem className='text-[13px]'><Check className={cn('mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]')} />Intermidate</CommandItem>
                    <CommandItem className='text-[13px]'><Check className={cn('mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]')} />Advanced</CommandItem>
                    <CommandItem className='text-[13px]'><Check className={cn('mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]')} />All levels</CommandItem>
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
                    <CommandItem className='text-[13px]'><Check className={cn('mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]')} />Free</CommandItem>
                    <CommandItem className='text-[13px]'><Check className={cn('mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]')} />Paid</CommandItem>
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
                          <CommandItem className='text-[13px]'>
                            <Check className={cn('mr-2 h-4 w-4 text-teal-500 border bg-white-primary border-slate-300 rounded-[2px]')} />
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
            <div className="flex flex-coll gap-2"></div>
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
