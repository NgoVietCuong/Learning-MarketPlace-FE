import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Img } from '@/components/ui/img';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import InstructorLayout from '@/components/layout/instructor-layout';
import { paymentApi } from '@/services/axios/paymentApi';
import useProfile from '@/hooks/useProfile';

export default function InstructorSettings() {
  const { profile } = useProfile();
  const [isChanged, setIsChanged] = useState(false);
  const [onboarding, setOnboarding] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');

  const handleOnboardMerchant = async () => {
    setOnboarding(true);
    const onboardResponse = await paymentApi.onboardMerchant({ paypalEmail });
    if (!onboardResponse.error) {
      const actionUrl = onboardResponse.data?.actionUrl;
      window.location.href = actionUrl!;
    }
  };

  useEffect(() => {
    if (profile) {
      setPaypalEmail(profile.data?.paypalEmail || '');
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      setIsChanged(profile.data?.paypalEmail !== paypalEmail);
    }
  }, [paypalEmail]);

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl overflow-y-scroll">
        <div className="px-10 py-8 flex flex-col gap-8">
          <Heading className="!font-medium">Instructor Wallet</Heading>
          <div className="w-full flex flex-col gap-4">
            {profile && !profile.data?.paypalEmail && (
              <div className="w-[38%] space-y-4">
                <Text className="!font-medium !text-gray-700">Connect Your Paypal Account</Text>
                <Text size="sm" className="!text-gray-700">
                  To receive payments from our platform, please connect your PayPal account. This will enable us to
                  transfer your earnings directly to your PayPal account.
                </Text>
                <Text size="sm" className="!text-gray-700">
                  Click the button below to connect your PayPal account securely.
                </Text>
                <Input
                  size="sm"
                  type="text"
                  placeholder="Enter your paypal email"
                  value={paypalEmail}
                  onChange={(value: string) => setPaypalEmail(value)}
                />
                <Button
                  disabled={onboarding || !paypalEmail}
                  size="sm"
                  className="active:scale-[98%] px-4"
                  onClick={handleOnboardMerchant}
                >
                  {onboarding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Paypal Setup
                </Button>
              </div>
            )}
            {profile && profile.data?.paypalEmail && (
              <div className="w-[30%] space-y-4">
                <Img src="/images/paypal_logo.png" alt="calendartwo_one" className="h-[40px] w-[140px]" />
                <Text size="sm" className="!font-medium !text-gray-700">
                  Paypal Account Connected
                </Text>
                <Input
                  size="sm"
                  type="text"
                  placeholder="Enter your paypal email"
                  value={paypalEmail}
                  onChange={(value: string) => setPaypalEmail(value)}
                />
                <Button
                  disabled={onboarding || !paypalEmail || !isChanged}
                  size="sm"
                  className="active:scale-[98%] px-4"
                  onClick={handleOnboardMerchant}
                >
                  {onboarding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Paypal Setup
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

InstructorSettings.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
