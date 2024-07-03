import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { FiUser, FiMail, FiLock, FiCheckSquare } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import FailedAlert from '@/components/alert/Failed';
import { authApi } from '@/services/axios/authApi';
import useUser from '@/hooks/fetch-data/useUser';

export default function SignUp() {
  const router = useRouter();
  const { userMutate } = useUser();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [apiError, setApiError] = useState('');

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

  const handleViewConfirmPassword = () => {
    const confirmPasswordInput = document.getElementById('confirm_password') as HTMLInputElement;
    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
      setConfirmVisibility(true);
    } else {
      confirmPasswordInput.type = 'password';
      setConfirmVisibility(false);
    }
  };

  const handleSignUp = async () => {
    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.trim() === '') (hasError = true), setUsernameError('Username cannot be empty');
    else (hasError = false), setUsernameError('');

    if (email.trim() === '') (hasError = true), setEmailError('Email cannot be empty');
    else if (email.length && !emailRegex.test(email)) (hasError = true), setEmailError('Invalid email');
    else (hasError = false), setEmailError('');

    if (password.trim() === '') (hasError = true), setPasswordError('Password cannot be empty');
    else (hasError = false), setPasswordError('');

    if (confirmPassword.trim() === '') (hasError = true), setConfirmError('Please confirm your password');
    else if (password !== confirmPassword) (hasError = true), setConfirmError('Passwords do not match');
    else (hasError = false), setConfirmError('');

    setApiError('');
    if (hasError) return;

    setLoading(true);
    const signUpResponse = await authApi.signUp({
      username,
      email,
      password,
    });

    if (signUpResponse.error) {
      const messages = signUpResponse.message;
      if (typeof messages === 'string') setApiError(messages);
      else setApiError(messages[0]);
      setLoading(false);
    } else {
      router.push({ pathname: '/verify-signup', query: { email: encodeURIComponent(email) } });
    }
  };

  return (
    <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[25%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="w-[75%] flex flex-col items-center gap-4 py-10">
            <Heading className="mb-[12px] text-gray-700">Sign up</Heading>
            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-full flex flex-col gap-1">
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  prefix={<FiUser size={20} color="#6b7280" />}
                  onChange={(value: string) => setUsername(value)}
                />
                {usernameError && (
                  <Text size="xs" as="p" className="text-red-400 font-medium">
                    {usernameError}
                  </Text>
                )}
              </div>

              <div className="w-full flex flex-col gap-1">
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
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

              <div className="w-full flex flex-col gap-1">
                <Input
                  type="password"
                  id="confirm_password"
                  placeholder="Confirm password"
                  prefix={<FiCheckSquare fontSize="20px" color="#6b7280" />}
                  suffix={
                    <Button variant={'ghost'} className="p-0" onClick={handleViewConfirmPassword}>
                      {confirmVisibility ? (
                        <FaEye size={18} color="#6b7280" />
                      ) : (
                        <FaEyeSlash size={18} color="#6b7280" />
                      )}
                    </Button>
                  }
                  onChange={(value: string) => setConfirmPassword(value)}
                />
                {confirmError && (
                  <Text size="xs" as="p" className="text-red-400 font-medium">
                    {confirmError}
                  </Text>
                )}
              </div>
            </div>
            {apiError && <FailedAlert title={'Sign up failed'} message={apiError} />}
            <Button
              disabled={loading}
              className="w-full my-[7px] text-white-primary bg-teal-secondary active:scale-[98%]"
              onClick={handleSignUp}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign up
            </Button>

            <div className="w-full flex items-center">
              <div className="flex-1 border-t-2 border-gray-200"></div>
              <span className="text-sm px-3 text-gray-primary bg-white">or Sign Up with</span>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>

            <GoogleLogin
              type="icon"
              theme="outline"
              size="large"
              shape="circle"
              width="48px"
              onSuccess={async (credentialResponse) => {
                const googleLoginResponse = await authApi.googleLogin({
                  idToken: credentialResponse.credential as string,
                });
                if (googleLoginResponse.error) {
                  const messages = googleLoginResponse.message;
                  if (typeof messages === 'string') setApiError(messages);
                  else setApiError(messages[0]);
                } else {
                  userMutate();
                  router.push('/');
                }
              }}
              onError={() => setApiError('Google login failed. Please try again.')}
            />

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
}
