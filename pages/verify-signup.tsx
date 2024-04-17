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

const VerifySignUp = () => {
  return (
    <div className="w-full grow bg-[url('/images/img_background.jpg')] bg-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[24%] bg-white-primary rounded-xl flex flex-col items-center justify-center shadow-lg">
          <div className="w-[75%] flex flex-col items-center gap-3 py-10">
            <Heading className="text-gray-700">Enter verification code</Heading>
            <Text size="xs" as="p" className="text-center mb-[12px]">
              We've sent a code to <span className="font-medium">hangongon2000@gmail.com</span>
            </Text>
            <div className="flex flex-col items-center gap-3">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12" />
                  <InputOTPSlot index={1} className="w-12 h-12" />
                  <InputOTPSlot index={2} className="w-12 h-12" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="w-12 h-12" />
                  <InputOTPSlot index={4} className="w-12 h-12" />
                  <InputOTPSlot index={5} className="w-12 h-12" />
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
              <Button className="w-full text-gray-600 border-[1px] border-slate-200 bg-white-primary active:scale-[98%]">
                Cancel
              </Button>
              <Button className="w-full text-white-primary bg-teal-secondary active:scale-[98%]">
                Verify
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifySignUp;
