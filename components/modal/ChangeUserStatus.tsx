import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Loader2 } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FailedAlert from '@/components/alert/Failed';
import { Response } from '@/types/response';

interface UserStatusProps {
  title: string;
  message: string;
  action: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mutate?: any;
  apiHandler: () => Promise<Response>;
}

export default function ChangeUserStatus({ title, action, message, open, setOpen, mutate, apiHandler } : UserStatusProps) {
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    setUpdating(false);
    setUpdateError('');
  }, [open]);

  const handleChangeUserStatus = async () => {
    setUpdating(true);
    const updateResponse = await apiHandler();
    if (updateResponse.error) {
    } else {
      mutate();
      setOpen(false);
      toast({
        variant: 'success',
        description: `${action} user successfully!`,
      });
    }
    setUpdating(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white-primary rounded-lg flex flex-col py-6 max-w-[23%] gap-5">
        <DialogTitle className="text-2xl text-gray-700">{title}</DialogTitle>
        <DialogHeader className="w-full flex justify-start text-sm">
          <Text size="sm" className="text-left">{message}</Text>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-3">
          <div className="w-[85%] flex flex-col items-center p-0">
            {updateError && <FailedAlert title={`${action} user failed`} message={updateError} />}
          </div>
          <div className="flex items-center gap-3 justify-end">
            <Button variant={'ghost'} size="sm" className="bg-gray-200 active:scale-[98%]" onClick={() => setOpen(!open)}>
              Cancel
            </Button>
            <Button
              disabled={updating}
              size="sm"
              type="button"
              className={`${action === 'Ban' ? 'bg-red-500' : 'bg-teal-500'} text-white-primary px-[20px] active:scale-95`}
              onClick={handleChangeUserStatus}
            >
              {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {action}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}