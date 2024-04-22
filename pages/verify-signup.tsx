import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Loader2 } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import FailedAlert from '@/components/alert/Failed';
import SuccessAlert from '@/components/alert/Success';
import LoginModal from '@/components/modal/Login';
import { authApi } from '@/services/axios/authApi';

interface VerifySignUpPageProps {
  queryEmail: string;
}

export default function VerifySignUpPage({ queryEmail }: VerifySignUpPageProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [verifySuccess, setVerifySuccess] = useState(false);

  useEffect(() => {
    if (!queryEmail) router.push('/');
    else {
      const decodedEmail = decodeURIComponent(queryEmail);
      setEmail(decodedEmail);
    }
  }, [queryEmail]);

  const handleSendVerifyEMail = async () => {
    setVerifyError('');
    setSendError('');
    setSending(true);
    const sendVerifyEmailResponse = await authApi.resendVerifyEmail({ email });

    setSending(false);
    if (sendVerifyEmailResponse.error) {
      setSendError(sendVerifyEmailResponse.message);
    } else {
      setSendSuccess(true);
    }
  };

  const handleVerifySignUp = async () => {
    setSendSuccess(false);
    setVerifyError('');
    setSendError('');
    setVerifying(true);
    const verifySignUpResponse = await authApi.verifySignUp({ email, code });

    setVerifying(false);
    if (verifySignUpResponse.error) {
      setVerifyError(verifySignUpResponse.message);
    } else {
      setVerifySuccess(true);
    }
  };

  return (
    <>
      <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-[24%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
            <div className="w-[75%] flex flex-col items-center gap-3 py-10">
              <Heading className="text-gray-700">Enter verification code</Heading>
              <Text size="xs" as="p" className="text-center mb-[12px]">
                We've sent a code to <span className="font-medium">email</span>
              </Text>
              <div className="flex flex-col items-center gap-3">
                <InputOTP maxLength={6} value={code} onChange={(value) => setCode(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Text size="xs">
                Didn't get a code?{' '}
                <Button
                  disabled={sending}
                  variant={'ghost'}
                  className="p-0 text-xs text-teal-500"
                  onClick={handleSendVerifyEMail}
                >
                  Click to Resend
                  {sending && <Loader2 className="ml-1 h-4 w-4 animate-spin" />}
                </Button>
              </Text>

              {verifyError && <FailedAlert title={'Verified failed'} message={verifyError} />}
              {sendError && <FailedAlert title={'Sent code failed'} message={sendError} />}
              {sendSuccess && (
                <SuccessAlert title={'Sent code successfully'} message={'A new verification email has been sent'} />
              )}

              <div className="w-full flex items-center gap-2">
                <Button
                  className="w-full text-gray-600 border-[1px] border-slate-200 bg-white-primary active:scale-[98%]"
                  onClick={() => router.push('/')}
                >
                  Cancel
                </Button>
                <Button
                  disabled={verifying || code.length < 6}
                  className="w-full text-white-primary bg-teal-secondary active:scale-[98%]"
                  onClick={handleVerifySignUp}
                >
                  {verifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={verifySuccess} title={'Verification Success'} message={'Your email has been verified successfully. Now you can login to dicover a variety of quality courses'} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { email } = query;

  return {
    props: {
      queryEmail: email || null,
    },
  };
}
