import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import useUser from '@/hooks/useUser';

export default function LearnHeader() {
  const { user, isLoading } = useUser();

  return (
    <>
      <header className="w-full bg-white-primary shadow-lg">
        <div className="w-[90%] flex mx-auto items-center justify-between gap-5 px-[150px] my-[10px]">
          <div className="flex items-center justify-center gap-10 z-50">
          <div className="flex items-center justify-center md:w-full">
              <Img src="/images/img_refresh_cyan_a200.svg" alt="refresh_one" className="h-[54px] w-[54px] rounded-md" />
              <Heading size="3xl" as="h2" className="relative ml-[-41px] tracking-[1.28px] !text-gray-700">
                HoaLearn
              </Heading>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
