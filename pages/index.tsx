import Link from 'next/link';
import { Search } from 'lucide-react';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import useUser from '@/hooks/useUser';

export default function Home() {
  const { user } = useUser();

  return (
    <div className="w-full grow bg-white-primary">
      <div className="flex flex-col items-center gap-y-20">
        <div className="w-full bg-teal-secondary">
          <div className="max-w-[1300px] h-[700px] mx-auto flex justify-between ">
            <div className="flex flex-col w-[40%] justify-center gap-5">
              <Heading size="10xl" as="h2">
                <span className="font-semibold text-indigo-secondary">Growing up&nbsp;</span>
                <span className="font-semibold text-white-primary">your skills by online courses with HoaLearn</span>
              </Heading>
              <Text className="text-white-primary">
                HoaLearn is a great platform that will teach you in a more interesting way
              </Text>
              {user ? (
                <div className="w-full flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    prefix={<Search size={16} color="#6b7280" />}
                    className="!bg-white-primary border-none grow"
                  />
                  <Button className="!h-[38px] bg-sky-600">Search</Button>
                </div>
              ) : (
                <Link href="/sign-up">
                  <Text
                    size="sm"
                    as="p"
                    className="max-w-max px-[15px] py-[10px] text-teal-600 bg-white-primary rounded-md shadow-lg active:scale-95"
                  >
                    Join for free
                  </Text>
                </Link>
              )}
            </div>

            <div className="flex flex-col justify-center gap-5 w-[45%]">
              <Img src="images/img_landing.jpg" alt="img_file" className="h-[500px] rounded-xl mx-auto" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full max-w-[1100px] mx-auto">
          <Heading size="6xl" as="h2">
            <span className="font-bold text-indigo-secondary">All-In-One&nbsp;</span>
            <span className="font-bold text-teal-primary">Learning Platform.</span>
          </Heading>
          <Text size="s" as="p" className="mt-[26px] w-[57%] text-center leading-[180%]">
            HoaLearn is your go-to platform for a wide variety of online courses, offering a convenient way to learn and
            grow from anywhere
          </Text>
          <div className="mt-[60px] flex gap-[60px] self-stretch">
            <div className="flex w-full flex-col items-center">
              <div className="relative z-[1] w-[18%] flex flex-col items-center rounded-[50%] bg-indigo-primary p-[17px] shadow-lg">
                <Img src="images/img_file.svg" alt="img_file" className="h-[25px]" />
              </div>
              <div className="relative mt-[-43px] h-[300px] p-[50px] flex flex-col items-center gap-6 self-stretch rounded-[20px] px-[25px] bg-white-700 shadow-xs md:p-5">
                <Text size="xl" as="p" className="mt-[30px] w-[98%] font-medium text-center !text-indigo-secondary">
                  Quality Courses
                </Text>
                <Text size="sm" as="p" className="w-[90%] text-center leading-[180%]">
                  Courses in diverse fields are carefully prepared in content by skilled teachers, accompanied by
                  high-quality videos and articles
                </Text>
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="relative z-[2] w-[18%] flex flex-col items-center rounded-[50%] bg-teal-primary p-[17px] shadow-lg md:w-full sm:p-5">
                <Img src="images/img_globe.svg" alt="calendartwo_one" className="h-[25px] w-[25px]" />
              </div>
              <div className="relative mt-[-43px] h-[300px] flex flex-col items-center gap-6 self-stretch rounded-[20px] bg-white-A700 px-[25px] p-9 shadow-xs sm:p-5">
                <Text
                  size="xl"
                  as="p"
                  className="mt-[44px] w-[90%] font-medium text-center !text-indigo-secondary md:w-full"
                >
                  Easy Access
                </Text>
                <Text size="sm" as="p" className="mb-3.5 text-center leading-[180%]">
                  Access courses from anywhere, at a reasonable price compared to the good quality of the courses
                </Text>
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              <div className="relative z-[3] w-[18%] flex flex-col items-center rounded-[50%] bg-light_blue-primary p-[11px] shadow-lg">
                <Img src="images/img_users_1.svg" alt="usersone_one" className="my-1.5 h-[25px] w-full md:h-auto" />
              </div>
              <div className="relative mt-[-43px] h-[300px] flex flex-col items-center gap-7 self-stretch rounded-[20px] bg-white-primary px-[25px] py-[50px] shadow-xs">
                <Text size="xl" as="p" className="mt-[32px] font-medium text-center !text-indigo-secondary">
                  User-friendly interface
                </Text>
                <Text size="sm" as="p" className="w-[87%] text-center leading-[180%]">
                  With a modern, friendly user interface, our platform ensures a new and exciting learning experience
                  for all users.
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center"></div>
      </div>
    </div>
  );
}
