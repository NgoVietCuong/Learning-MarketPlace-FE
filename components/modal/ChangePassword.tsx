import { Loader2 } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLock, FiCheckSquare } from 'react-icons/fi';
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FailedAlert from '@/components/alert/Failed';
import SuccessAlert from '@/components/alert/Success';

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [visibility, setVisibility] = useState(false);
  const [newVisisbility, setNewVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdatePassword = async () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white-primary bg-teal-secondary active:scale-[98%]">Change</Button>
      </DialogTrigger>
      <DialogContent className="bg-white-primary rounded-lg flex flex-col items-center pt-8 pb-5 max-w-[25%] gap-2">
        <DialogHeader className="w-[85%] flex flex-col items-center gap-3">
          <DialogTitle className="text-2xl text-gray-700 mb-[10px]">Change Password</DialogTitle>
          <div className="w-full flex flex-col items-start gap-3">
            <div className="w-full flex flex-col items-start gap-1">
              <Text size="xs" className="font-medium">
                Current Password
              </Text>
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
                onChange={(value: string) => setPassword(value)}
              />
              {passwordError && (
                <Text size="xs" as="p" className="text-red-400 font-medium">
                  {passwordError}
                </Text>
              )}
            </div>

            <div className="w-full flex flex-col items-start gap-1">
              <Text size="xs" className="font-medium">
                New Password
              </Text>
              <Input
                type="password"
                id="new_password"
                placeholder="Enter your new password"
                className="mb-[5px] pr-[100px]"
                prefix={<FiLock size={20} color="#6b7280" />}
                suffix={
                  <Button variant={'ghost'} className="p-0">
                    {newVisisbility ? <FaEye size={18} color="#6b7280" /> : <FaEyeSlash size={18} color="#6b7280" />}
                  </Button>
                }
                onChange={(value: string) => setNewPassword(value)}
              />
              {newPasswordError && (
                <Text size="xs" as="p" className="text-red-400 font-medium">
                  {newPasswordError}
                </Text>
              )}
            </div>

            <div className="w-full flex flex-col items-start gap-1">
              <Text size="xs" className="font-medium">
                Confirm Password
              </Text>
              <Input
                type="password"
                id="confirm_password"
                placeholder="Confirm your password"
                className="mb-[5px] pr-[100px]"
                prefix={<FiCheckSquare size={20} color="#6b7280" />}
                suffix={
                  <Button variant={'ghost'} className="p-0">
                    {confirmVisibility ? <FaEye size={18} color="#6b7280" /> : <FaEyeSlash size={18} color="#6b7280" />}
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
        </DialogHeader>

        <div className="w-[85%] flex flex-col items-center p-0">
          {updateError && <FailedAlert title={'Sent mail failed'} message={updateError} />}
          {updateSuccess && (
            <SuccessAlert title={'Sent mail successfully'} message={'A new verification email has been sent'} />
          )}
        </div>

        <DialogFooter className="pt-0">
          <Button
            disabled={updating}
            type="button"
            className="bg-teal-secondary text-white-primary px-[30px] active:scale-95"
            onClick={handleUpdatePassword}
          >
            {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
