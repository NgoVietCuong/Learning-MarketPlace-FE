import { useRouter } from 'next/router';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FailedAlert from '@/components/alert/Failed';
import { Response } from '@/types/response';

interface DeleteActionProps {
  title: string;
  object: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mutate: any;
  redirect?: boolean
  apiHandler: () => Promise<Response>;
}

export default function DeleteAction({ title, object, open, setOpen, mutate, redirect, apiHandler }: DeleteActionProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    setDeleting(false);
    setDeleteError('');
  }, [open]);

  const handleDelete = async () => {
    setDeleting(true);
    const deleteResponse = await apiHandler();
    if (deleteResponse.error) {
      setDeleteError(deleteResponse.message);
    } else {
      mutate();
      setOpen(false);
      toast({
        variant: 'success',
        description: `Deleted ${object} successfully!`,
      });
      if (redirect) router.push('/instructor/courses');
    }
    setDeleting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white-primary rounded-lg flex flex-col py-6 max-w-[23%] gap-5">
        <DialogTitle className="text-2xl text-gray-700">{title}</DialogTitle>
        <DialogHeader className="w-full flex justify-start text-sm">
          <Text size="sm" className="text-left">
            Are you sure you want to delete this {object}? You won't be able to undo it.
          </Text>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-3">
          <div className="w-[85%] flex flex-col items-center p-0">
            {deleteError && <FailedAlert title={`Delete ${object} failed`} message={deleteError} />}
          </div>
          <div className="flex items-center gap-3 justify-end">
            <Button size="sm" className="bg-gray-200 active:scale-[98%]" onClick={() => setOpen(!open)}>
              Cancel
            </Button>
            <Button
              size="sm"
              type="button"
              className="bg-red-500 text-white-primary px-[20px] active:scale-95"
              onClick={handleDelete}
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
