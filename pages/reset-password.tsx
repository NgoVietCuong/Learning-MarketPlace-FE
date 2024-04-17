import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { FiLock, FiCheckSquare } from "react-icons/fi";
import { FaEyeSlash } from "react-icons/fa"; 

const ResetPassword = () => {
  return (
    <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[25%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="w-[75%] flex flex-col items-center gap-4 py-10">
            <Heading className="mb-[12px] text-gray-700">Reset Your Password</Heading>
            <div className="w-full flex flex-col items-center gap-3">
              <Input
                type="password"
                id="password"
                placeholder="Enter your email"
                className="mb-[5px] pr-[100px]"
                prefix={<FiLock size={20} color="#6b7280" />}
                suffix={<FaEyeSlash size={18} color="#6b7280" />}
              />
              <Input
                type="password"
                id="confirm_password"
                placeholder="Confirm password"
                className="mb-[5px] pr-[100px]"
                prefix={<FiCheckSquare size={20} color="#6b7280" />}
                suffix={<FaEyeSlash size={18} color="#6b7280" />}
              />
              <Button
                variant={'ghost'}
                className="mt-[-10px] p-0 self-end text-xs font-medium text-teal-500"
              >
                Forgot password?
              </Button>
            </div>
            <Button className="mt-[-10px] w-full text-white-primary bg-teal-secondary active:scale-[98%]">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
