import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

export default function VerifySignUpPage({ queryEmail }: { queryEmail: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  useEffect(() => {
    if (!queryEmail) router.push('/');
    else {
      const decodedEmail = decodeURIComponent(queryEmail);
      setEmail(decodedEmail);
    }
  }, [queryEmail]);

  const handleVerifySignUp = async () => {};

  return (
    <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[24%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="w-[75%] flex flex-col items-center gap-3 py-10">
            <Heading className="text-gray-700">Enter verification code</Heading>
            <Text size="xs" as="p" className="text-center mb-[12px]">
              We've sent a code to <span className="font-medium">email</span>
            </Text>
            <div className="flex flex-col items-center gap-3">
              <InputOTP maxLength={6} value={verifyCode} onChange={(value) => setVerifyCode(value)}>
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
              <Button variant={'ghost'} className="p-0 text-xs text-teal-500">
                Click to Resend
              </Button>
            </Text>

            <div className="w-full flex items-center gap-2">
              <Button
                className="w-full text-gray-600 border-[1px] border-slate-200 bg-white-primary active:scale-[98%]"
                onClick={() => router.push('/')}
              >
                Cancel
              </Button>
              <Button
                className="w-full text-white-primary bg-teal-secondary active:scale-[98%]"
                onClick={handleVerifySignUp}
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
