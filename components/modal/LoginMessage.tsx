import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface LoginMessageModalProps {
  open: boolean;
  title: string;
  message: string;
}

export default function LoginMessageModal({ open, title, message }: LoginMessageModalProps) {
  const router = useRouter();

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-white-primary rounded-lg flex flex-col items-center">
        <CheckCircle className="h-[60px] w-[60px] text-teal-secondary" />
        <AlertDialogHeader className="w-[80%]">
          <AlertDialogTitle className="text-xl text-gray-700">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-primary">{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-start">
          <Button
            type="button"
            className="bg-teal-secondary text-white-primary mt-[5px] px-[30px]"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
