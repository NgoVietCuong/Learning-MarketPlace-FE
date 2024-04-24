import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import FailedAlert from '@/components/alert/Failed';
import EmailProvider from '@/components/modal/EmailProvider';
import { authApi } from '@/services/axios/authApi';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loggingIn, setLoggingIn] = useState(false);
  const [logInEror, setLoginError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(!openModal);

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
    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') (hasError = true), setEmailError('Email cannot be empty');
    else if (email.length && !emailRegex.test(email)) (hasError = true), setEmailError('Invalid email');
    else (hasError = false), setEmailError('');

    if (password.trim() === '') (hasError = true), setPasswordError('Password cannot be empty');
    else (hasError = false), setPasswordError('');
    setLoginError('');
    if (hasError) return;

    setLoggingIn(true);
    const loginResponse = await authApi.login({ email, password });
    setLoggingIn(false);

    if (loginResponse.error) {
      setLoginError(loginResponse.message);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-[25%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
            <div className="w-[75%] flex flex-col items-center gap-4 py-10">
              <Heading className="mb-[12px] text-gray-700">Login</Heading>
              <div className="w-full flex flex-col items-center gap-3">
                <div className="w-full flex flex-col gap-1">
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="mb-[5px] pr-[100px]"
                    prefix={<FiMail size={20} color="#6b7280" />}
                    onChange={(value: string) => setEmail(value)}
                  />
                  {emailError && (
                    <Text size="xs" as="p" className="text-red-400 font-medium">
                      {emailError}
                    </Text>
                  )}
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="mb-[5px] pr-[100px]"
                    prefix={<FiLock size={20} color="#6b7280" />}
                    suffix={
                      <Button variant={'ghost'} className="p-0" onClick={handleViewPassword}>
                        {visibility ? <FaEye size={18} color="#6b7280" /> : <FaEyeSlash size={18} color="#6b7280" />}
                      </Button>
                    }
                    onChange={(value: string) => setPassword(value)}
                  />
                  {passwordError && (
                    <Text size="xs" as="p" className="text-red-400 font-medium">
                      {passwordError}
                    </Text>
                  )}
                </div>

                <Button
                  variant={'ghost'}
                  className="my-[-10px] p-0 self-end text-xs font-medium text-teal-500"
                  onClick={handleOpenModal}
                >
                  Forgot password?
                </Button>
              </div>

              {logInEror && <FailedAlert title={'Sign up failed'} message={logInEror} />}

              <Button
                disabled={loggingIn}
                onClick={handleLogin}
                className="mt-[-5px] w-full text-white-primary bg-teal-secondary active:scale-[98%]"
              >
                {loggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
      <EmailProvider
        open={openModal}
        setOpen={setOpenModal}
        title={'Request Password Reset'}
        apiHandler={authApi.sendResetEmail}
        url={`${process.env.NEXT_PUBLIC_APP_URL}/reset-password`}
      />
    </>
  );
}
