import Link from 'next/link';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaEyeSlash } from 'react-icons/fa';

const VerifySignUp = () => {
  return (
    <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[24%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="w-[75%] flex flex-col items-center gap-3 py-10">
            <Heading className="text-gray-700">Verify Your Email</Heading>
            <Text size="xs" as="p" className="text-center mb-[12px]">Enter the verification code sent to hangongon2000@gmail.com</Text>
            <div className="w-full flex justify-between items-center">
              <Text size="xs" as="p" className="font-medium">Verify code</Text>
              <Button
                variant={'ghost'}
                className="mt-[-10px] p-0 self-end text-xs text-teal-500"
              >
                Resend? 59s
              </Button>
            </div>
            <div className="flex flex-col items-center gap-3">
              <InputOTP maxLength={6}>
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
            <Button className="w-full text-white-primary bg-teal-secondary active:scale-[98%]">
              Verify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifySignUp;
