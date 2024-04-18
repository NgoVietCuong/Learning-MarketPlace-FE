import Link from 'next/link';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

export default function NavBar() {
  return (
    <header className="w-full bg-white-primary shadow-lg">
      <div className="w-[85%] flex mx-auto items-center justify-between gap-5 px-[150px] my-[10px]">
        <div className="flex items-center justify-center gap-10  z-50">
          <div className="flex items-center justify-center md:w-full">
            <Img src="images/img_refresh_cyan_a200.svg" alt="refresh_one" className="h-[54px] w-[54px] rounded-md" />
            <Heading size="3xl" as="h2" className="relative ml-[-41px] tracking-[1.28px] !text-gray-700">
              HoaLearn
            </Heading>
          </div>
          <div className="flex items-center justify-center gap-7">
            <Link href="/">
              <Text size="sm" as="p" className="font-medium text-gray-700 hover:text-teal-primary">
                Home
              </Text>
            </Link>
            <Link href="/courses">
              <Text size="sm" as="p" className="font-medium text-gray-700 hover:text-teal-primary">
                Courses
              </Text>
            </Link>
            <Link href="/blog">
              <Text size="sm" as="p" className="font-medium text-gray-700 hover:text-teal-primary">
                Blogs
              </Text>
            </Link>
            <Link href="/about-us">
              <Text size="sm" as="p" className="font-medium text-gray-700 hover:text-teal-primary">
                About Us
              </Text>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-end gap-10 pl-100 z-50">
          <div className="flex items-center gap-7">
            <Link href="/login">
              <Text size="sm" as="p" className="font-medium text-gray-700 hover:text-teal-primary">
                Login
              </Text>
            </Link>
            <Link href="/sign-up">
              <Text
                size="sm"
                as="p"
                className="font-medium !text-white-primary bg-teal-secondary px-[20px] py-[8px] rounded-md shadow-lg active:scale-95"
              >
                Sign up
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
