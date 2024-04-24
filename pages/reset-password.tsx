import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Loader2, CircleX } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { FiLock, FiCheckSquare } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FailedAlert from '@/components/alert/Failed';
import EmailProvider from '@/components/modal/EmailProvider';
import LoginMessageModal from '@/components/modal/LoginMessage';
import { authApi } from '@/services/axios/authApi';
import axiosClient from '@/services/axios';

interface ResetPasswordProps {
  isValid: boolean;
  email: string;
  code: string;
}

export default function ResetPassword({ isValid, email, code }: ResetPasswordProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

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

  const handleUpdatePassword = async () => {
    let hasError = false;
    if (password.trim() === '') (hasError = true), setPasswordError('Password cannot be empty');
    else (hasError = false), setPasswordError('');

    if (confirmPassword.trim() === '') (hasError = true), setConfirmError('Please confirm your password');
    else if (password !== confirmPassword) (hasError = true), setConfirmError('Passwords do not match');
    else (hasError = false), setConfirmError('');

    setUpdateError('');
    if (hasError) return;

    setUpdating(true);
    const updatePasswordResponse = await authApi.updatePassword({ email, code, password });
    setUpdating(false);

    if (updatePasswordResponse.error) {
      setUpdateError(updatePasswordResponse.message);
    } else {
      setUpdateSuccess(true);
    }
  };

  return (
    <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[25%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          {isValid ? (
            <>
              <div className="w-[75%] flex flex-col items-center gap-4 py-10">
                <Heading className="mb-[12px] text-gray-700">Reset Your Password</Heading>
                <div className="w-full flex flex-col items-center gap-3">
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

                {updateError && <FailedAlert title={'Verified failed'} message={updateError} />}

                <Button
                  disabled={updating}
                  className="w-full text-white-primary bg-teal-secondary active:scale-[98%]"
                  onClick={handleUpdatePassword}
                >
                  {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit
                </Button>
              </div>
              <LoginMessageModal
                open={updateSuccess}
                title={'Password Changed'}
                message={'Please login with the new password'}
              />
            </>
          ) : (
            <>
              <div className="w-[75%] flex flex-col items-center gap-4 py-10">
                <Heading className="mb-[12px] text-gray-700">Reset Password</Heading>
                <CircleX className="h-[70px] w-[70px] text-teal-secondary" />
                <Text size="sm" as="p" className="text-center">
                  The reset link is invalid or expired. Please request a new one
                </Text>
                <div className="w-full flex items-center gap-2">
                  <Button
                    className="w-full text-gray-600 border-[1px] border-slate-200 bg-white-primary active:scale-[98%]"
                    onClick={handleOpenModal}
                  >
                    Resend
                  </Button>
                  <Button
                    className="w-full text-white-primary bg-teal-secondary active:scale-[98%]"
                    onClick={() => router.push('/')}
                  >
                    Back to Home
                  </Button>
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
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { email, code } = query;
  let isValid = false;

  if (email && code) {
    const verifyCodeResponse = await axiosClient.post(`${process.env.SERVER_URL}/auth/verify-reset-password`, {
      email,
      code,
    });
    if (verifyCodeResponse.data) isValid = verifyCodeResponse.data.isValid;
  }

  return {
    props: {
      isValid,
      email,
      code,
    },
  };
}
