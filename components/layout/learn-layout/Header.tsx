import { useRouter } from 'next/router';
import { Rate, Progress } from 'antd';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import useUser from '@/hooks/useUser';

export default function LearnHeader() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  return (
    <>
      <header className="w-full bg-blue_gray-primary shadow-lg">
        <div className="w-[90%] flex mx-auto items-center justify-between gap-5 px-[150px] my-[10px]">
          <div className="flex items-center justify-center gap-4 z-50">
            <div className="flex items-center justify-center md:w-full pr-2">
              <Img src="/images/img_refresh_cyan_a200.svg" alt="refresh_one" className="h-[44px] w-[44px] rounded-md" />
              <Heading size="2xl" as="h2" className="relative ml-[-36px] tracking-[1.28px] !text-white-primary cursor-pointer" onClick={() => router.push('/')}>
                HoaLearn
              </Heading>
            </div>
            <div className='w-[1px] h-[28px] bg-white-primary'></div>
            <div>
              <Heading size="lg" className="!font-medium !text-white-primary">Javascript for beginers</Heading>
            </div>
          </div>
          <div className='flex items-center justify-end gap-6 z-50'>
            <Button size="sm" variant={'ghost'} className='text-tx !text-white-primary'><Rate className="text-sm text-gray-400 mr-2" count={1} defaultValue={1} />Leave a rating</Button>
            <Text size="tx" className='!font-medium !text-white-primary inline-flex items-center gap-2'><Progress className='circle-progess' size={40} type="circle" percent={75} />Your progress</Text>
          </div>
        </div>
      </header>
    </>
  );
}
