import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FiLock, FiCheckSquare } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FailedAlert from '@/components/alert/Failed';

export default function ChangePassword() {
  const [visibility, setVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white-primary bg-teal-secondary active:scale-[98%]">Change</Button>
      </DialogTrigger>
      <DialogContent className="bg-white-primary rounded-lg flex flex-col items-center pt-8 pb-5 max-w-[25%] gap-2">
        <DialogHeader className="w-[85%] flex flex-col items-center gap-3">
          <DialogTitle className="text-2xl text-gray-700 mb-[10px]">Change Password</DialogTitle>
          <div className="w-full flex flex-col items-start gap-1">
            <Input
              type="password"
              id="current_password"
              placeholder="Enter your current password"
              className="mb-[5px] pr-[100px]"
              prefix={<FiLock size={20} color="#6b7280" />}
              suffix={
                <Button variant={'ghost'} className="p-0">
                  {visibility ? <FaEye size={18} color="#6b7280" /> : <FaEyeSlash size={18} color="#6b7280" />}
                </Button>
              }
              // onChange={(value: string) => setPassword(value)}
            />
            <Input
              type="password"
              id="new_password"
              placeholder="Enter your new password"
              className="mb-[5px] pr-[100px]"
              prefix={<FiLock size={20} color="#6b7280" />}
              suffix={
                <Button variant={'ghost'} className="p-0">
                  {visibility ? <FaEye size={18} color="#6b7280" /> : <FaEyeSlash size={18} color="#6b7280" />}
                </Button>
              }
              // onChange={(value: string) => setPassword(value)}
            />
            <Input
              type="password"
              id="confirm_password"
              placeholder="Confirm your password"
              className="mb-[5px] pr-[100px]"
              prefix={<FiCheckSquare size={20} color="#6b7280" />}
              suffix={
                <Button variant={'ghost'} className="p-0">
                  {visibility ? <FaEye size={18} color="#6b7280" /> : <FaEyeSlash size={18} color="#6b7280" />}
                </Button>
              }
              // onChange={(value: string) => setPassword(value)}
            />
          </div>
        </DialogHeader>
        <DialogFooter className="pt-0">
          <Button
            // disabled={sending}
            type="button"
            className="bg-teal-secondary text-white-primary px-[30px]"
            // onClick={handleSendEmail}
          >
            {/* {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} */}
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
