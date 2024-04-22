import Link from 'next/link';
import { useState } from 'react';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosClient from '@/services/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);

  const handleViewPassword = () => {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setVisibility(true);
    } else {
      passwordInput.type = 'password';
      setVisibility(false);
    }
  };

  const handleLogin = async () => {
    const test = await axiosClient.post('/auth/login', {
      email,
      password,
    });

    console.log('check', test);
  };

  return (
    <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[25%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="w-[75%] flex flex-col items-center gap-4 py-10">
            <Heading className="mb-[12px] text-gray-700">Login</Heading>
            <div className="w-full flex flex-col items-center gap-3">
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mb-[5px] pr-[100px]"
                prefix={<FiMail size={20} color="#6b7280" />}
                onChange={(value: string) => setEmail(value)}
              />
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mb-[5px] pr-[100px]"
                prefix={<FiLock size={20} color="#6b7280" />}
                suffix={
                  <Button variant={'ghost'} className="p-0" onClick={handleViewPassword}>
                    {visibility ? (
                      <FaEye size={18} color="#6b7280" />
                    ) : (
                      <FaEyeSlash size={18} color="#6b7280" />
                    )}
                  </Button>
                }
                onChange={(value: string) => setPassword(value)}
              />
              <Button
                variant={'ghost'}
                className="mt-[-10px] p-0 self-end text-xs font-medium text-teal-500"
              >
                Forgot password?
              </Button>
            </div>
            <Button
              onClick={handleLogin}
              className="mt-[-10px] w-full text-white-primary bg-teal-secondary active:scale-[98%]"
            >
              Login
            </Button>

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
              <Link href="/sign-up" className="font-medium text-teal-500">
                Sign up for free
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
