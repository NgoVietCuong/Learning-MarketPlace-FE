import { CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SuccessAlertProps {
  title: string;
  message: string;
}

export default function SuccessAlert({ title, message }: SuccessAlertProps) {
  return (
    <Alert variant="success">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}