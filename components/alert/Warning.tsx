import { TriangleAlert } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WarningAlertProps {
  message: string;
}

export default function WarningAlert({ message }: WarningAlertProps) {
  return (
    <Alert variant="warning">
      <AlertDescription className="flex items-center">
        <TriangleAlert className="h-4 w-4 mr-2 !text-gray-700" />
        <Text size="tx" className="font-medium !text-gray-700">
          {message}
        </Text>
      </AlertDescription>
    </Alert>
  );
}
