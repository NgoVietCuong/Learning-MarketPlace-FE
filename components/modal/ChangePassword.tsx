import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLock, FiCheckSquare } from 'react-icons/fi';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Text } from '@/components/ui/text';
import { Input } from '@/components//ui/input';
import { Button } from '@/components//ui/button';
import { useToast } from '@/components/ui/use-toast';
import FailedAlert from '@/components/alert/Failed';
import { userApi } from '@/services/axios/userApi';

interface ChangePasswordProps {
  userMutate: any;
}

export default function ChangePassword({ userMutate }: ChangePasswordProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setVisibility(false);
    setNewVisibility(false);
    setConfirmVisibility(false);

    setPasswordError('');
    setNewPasswordError('');
    setConfirmError('');

    setUpdating(false);
    setUpdateError('');
  }, [open]);

  const handleOpenModal = () => setOpen(!open);

  const handleViewPassword = () => {
    const passwordInput = document.getElementById('current_password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setVisibility(true);
    } else {
      passwordInput.type = 'password';
      setVisibility(false);
    }
  };

  const handleViewNewPassword = () => {
    const passwordInput = document.getElementById('new_password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setNewVisibility(true);
    } else {
      passwordInput.type = 'password';
      setNewVisibility(false);
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

    if (newPassword.trim() === '') (hasError = true), setNewPasswordError('New password cannot be empty');
    else (hasError = false), setNewPasswordError('');

    if (confirmPassword.trim() === '') (hasError = true), setConfirmError('Please confirm your password');
    else if (newPassword !== confirmPassword) (hasError = true), setConfirmError('Passwords do not match');
    else (hasError = false), setConfirmError('');

    setUpdateError('');
    if (hasError) return;

    setUpdating(true);
    const changePasswordResponse = await userApi.changePassword({ currentPassword: password, newPassword });
    setUpdating(false);

    if (changePasswordResponse.error) {
      setUpdateError(changePasswordResponse.message);
    } else {
      userMutate();
      setOpen(false);
      toast({
        variant: 'success',
        description: "Your password has been changed!",
      })
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          id="change_password_trigger"
          className="text-white-primary bg-teal-secondary active:scale-[98%]"
          onClick={handleOpenModal}
        >
          Change
        </Button>
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
                  <Button variant={'ghost'} className="p-0" onClick={handleViewNewPassword}>
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
                  <Button variant={'ghost'} className="p-0" onClick={handleViewConfirmPassword}>
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
          {updateError && <FailedAlert title={'Changed password failed'} message={updateError} />}
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
