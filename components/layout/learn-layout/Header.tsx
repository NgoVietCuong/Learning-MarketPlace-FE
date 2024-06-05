import { Rate, Progress } from 'antd';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import useUser from '@/hooks/useUser';

export default function LearnHeader() {
  const { user, isLoading } = useUser();

  return (
    <>
      <header className="w-full bg-white-primary shadow-lg">
        <div className="w-[90%] flex mx-auto items-center justify-between gap-5 px-[150px] my-[10px]">
          <div className="flex items-center justify-center gap-5 z-50">
            <div className="flex items-center justify-center md:w-full pr-2 border-r-2 border-white-primary">
              <Img src="/images/img_refresh_cyan_a200.svg" alt="refresh_one" className="h-[54px] w-[54px] rounded-md" />
              <Heading size="3xl" as="h2" className="relative ml-[-41px] tracking-[1.28px] !text-gray-700">
                HoaLearn
              </Heading>
            </div>
            <div>
              <Heading size="lg" className="!font-medium !text-gray-800">Javascript for beginers</Heading>
            </div>
          </div>
          <div className='flex items-center justify-end gap-5 z-50'>
            <Button variant={'ghost'} className='!text-gray-700'><Rate className="text-sm text-gray-400 mr-2" count={1} defaultValue={1} />Leave a rating</Button>
            <Text size="sm" className='!font-medium !text-gray-700 inline-flex items-center gap-2'><Progress size={40} type="circle" percent={75} />Your progress</Text>
          </div>
        </div>
      </header>
    </>
  );
}
