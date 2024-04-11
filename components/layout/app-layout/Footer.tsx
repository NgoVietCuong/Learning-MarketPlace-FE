import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

const Footer = () => {
  return (
    <footer className="w-full bottom-0 bg-blue_gray-primary">
      <div className="w-[85%] h-full mx-auto">
        <div className="m-auto flex h-max w-full flex-row items-center justify-between px-[150px] py-[20px]">
          <div className="flex w-[50%] items-center md:w-full gap-10">
            <div className="flex items-center justify-center md:w-full">
              <Img src="images/img_refresh_cyan_a200.svg" alt="refresh_one" className="h-[54px] w-[54px] rounded-md" />
              <Heading size="3xl" as="h2" className="relative ml-[-41px] tracking-[1.28px] !text-white-primary">
                HoaLearn
              </Heading>
            </div>
            <Text size="sm" as="p" className="text-center text-slate-200">
              Private Policy | Terms & Conditions
            </Text>
          </div>
          <Text size="sm" as="p" className="text-center text-slate-200">
            © 2024 Hoa Learning Marketplace.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
