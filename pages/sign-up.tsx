import Link from 'next/link';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { CiUser } from 'react-icons/ci';
import { CiMail } from 'react-icons/ci';
import { CiLock } from 'react-icons/ci';

const SignUp = () => {
  return (
    <div className="w-full grow">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="p-10 bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="w-full max-w-sm flex flex-col items-center gap-1.5">
            <Heading className="mb-[10px] text-gray-700">Sign up</Heading>
            <Input
              type="text"
              id="username"
              placeholder="Enter your username"
              prefix={<CiUser size={24} color="#6b7280" />}
            />
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mb-[5px] pr-[100px]"
              prefix={<CiMail size={24} color="#6b7280" />}
            />
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mb-[5px] pr-[100px]"
              prefix={<CiLock size={24} color="#6b7280" />}
            />
            <Input
              type="password"
              id="confirmpassword"
              placeholder="Confirm password"
              prefix={<CiLock size={24} color="#6b7280" />}
            />
            <Button className="text-white-primary bg-teal-secondary">Sign up</Button>

            <div className="w-full flex items-center">
              <div className="flex-1 border-t-2 border-gray-200"></div>
              <span className="text-sm px-3 text-gray-500 bg-white">or Sign Up with</span>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>

            <Button className='border-gray-100'>
              <Img src="images/img_google.svg" className='w-[24px]' />
            </Button>
            <Text size="xs" as="p" className="text-center mt-[10px]">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600">
                Login
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
