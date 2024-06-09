import { Info } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InfoAlertProps {
  message: string;
}

export default function InfoAlert({ message }: InfoAlertProps) {
  return (
    <Alert variant="info">
      <AlertDescription className="flex items-center">
        <Info className="h-4 w-4 mr-2 !text-gray-700" />
        <Text size="tx" className="font-medium !text-gray-700">
          {message}
        </Text>
      </AlertDescription>
    </Alert>
  );
}
