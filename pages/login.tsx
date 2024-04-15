import Link from 'next/link';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { FiMail, FiLock } from "react-icons/fi";
import { FaEyeSlash } from "react-icons/fa"; 

const Login = () => {
  return (
    <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[25%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="w-[75%] flex flex-col items-center gap-4 py-10">
            <Heading className="mb-[12px] text-gray-700">Login</Heading>
            <div className="flex flex-col items-center gap-3">
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mb-[5px] pr-[100px]"
                prefix={<FiMail size={20} color="#6b7280" />}
              />
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mb-[5px] pr-[100px]"
                prefix={<FiLock size={20} color="#6b7280" />}
                suffix={<FaEyeSlash size={18} color="#6b7280" />}
              />
              <Button variant={"ghost"} className='mt-[-10px] p-0 self-end font-medium text-teal-500'>Forgot password?</Button>
            </div>
            <Button className="w-full text-white-primary bg-teal-secondary active:scale-[98%]">Login</Button>

            <div className="w-full flex items-center">
              <div className="flex-1 border-t-2 border-gray-200"></div>
              <span className="text-sm px-3 text-gray-primary bg-white">or Login with</span>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>

            <Button className="border-gray-100 active:scale-95">
              <Img src="images/img_google.svg" className="w-[24px]" />
            </Button>
            <Text size="xs" as="p" className="text-center mt-[10px]">
              Not a member yet?{' '}
              <Link href="/login" className="font-medium text-teal-500">
                Sign up for free
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
