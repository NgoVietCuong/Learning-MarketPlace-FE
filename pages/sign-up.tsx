import Link from 'next/link';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { FiUser, FiMail, FiLock, FiCheckSquare } from "react-icons/fi";
import { FaEyeSlash } from "react-icons/fa"; 

const SignUp = () => {
  return (
    <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[25%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="w-[75%] flex flex-col items-center gap-4 py-10">
            <Heading className="mb-[12px] text-gray-700">Sign up</Heading>
            <div className="w-full flex flex-col items-center gap-3">
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                prefix={<FiUser size={20} color="#6b7280" />}
              />
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
              <Input
                type="password"
                id="confirm_password"
                placeholder="Confirm password"
                prefix={<FiCheckSquare fontSize="20px" color="#6b7280" />}
                suffix={<FaEyeSlash size={18} color="#6b7280" />}
              />
            </div>
            <Button className="w-full my-[7px] text-white-primary bg-teal-secondary active:scale-[98%]">Sign up</Button>

            <div className="w-full flex items-center">
              <div className="flex-1 border-t-2 border-gray-200"></div>
              <span className="text-sm px-3 text-gray-primary bg-white">or Sign Up with</span>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>

            <Button className="border-gray-100 active:scale-95">
              <Img src="images/img_google.svg" className="w-[24px]" />
            </Button>

            <Text size="xs" as="p" className="text-center mt-[10px]">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-teal-500">
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
