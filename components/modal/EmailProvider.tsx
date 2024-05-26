import { Dispatch, useState, SetStateAction, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FiMail } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import FailedAlert from '../alert/Failed';
import SuccessAlert from '../alert/Success';
import { Response } from '@/types/response';

interface EmailProviderProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  apiHandler: (body: any) => Promise<Response>;
  url?: string;
}

export default function EmailProvider({ open, setOpen, title, apiHandler, url }: EmailProviderProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    setEmail('');
    setEmailError('');
    setSendError('');
    setSendSuccess(false);
  }, [open]);

  const handleSendEmail = async () => {
    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') (hasError = true), setEmailError('Email cannot be empty');
    else if (email.length && !emailRegex.test(email)) (hasError = true), setEmailError('Invalid email');
    else (hasError = false), setEmailError('');

    setSendError('');
    setSendSuccess(false);
    if (hasError) return;

    setSending(true);
    const sendMailResponse = url ? await apiHandler({ email, url }) : await apiHandler({ email });
    setSending(false);

    if (sendMailResponse.error) {
      const messages = sendMailResponse.message;
      if (typeof messages === 'string') setSendError(messages);
      else setSendError(messages[0]);
    } else {
      setSendSuccess(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white-primary rounded-lg flex flex-col items-center pt-8 pb-5 max-w-[25%] gap-2">
        <DialogHeader className="w-[85%] flex flex-col items-center gap-3">
          <DialogTitle className="text-2xl text-gray-700 mb-[10px]">{title}</DialogTitle>
          <div className="w-full flex flex-col items-start gap-1">
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
        </DialogHeader>
        <div className="w-[85%] flex flex-col items-center p-0">
          {sendError && <FailedAlert title={'Sent mail failed'} message={sendError} />}
          {sendSuccess && (
            <SuccessAlert title={'Sent mail successfully'} message={'A new verification email has been sent'} />
          )}
        </div>
        <DialogFooter className="pt-0">
          <Button
            disabled={sending}
            type="button"
            className="bg-teal-secondary text-white-primary px-[30px] active:scale-95"
            onClick={handleSendEmail}
          >
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
