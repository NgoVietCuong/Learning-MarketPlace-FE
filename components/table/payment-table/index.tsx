import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Payment } from '@/types/schema';

interface PaymentTableProps {
  data: Payment[];
}

export function PaymentTable({data}: PaymentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-teal-500">ID</TableHead>
          <TableHead className="text-teal-500">Course Title</TableHead>
          <TableHead className="text-teal-500">Order Id</TableHead>
          <TableHead className="text-teal-500">Status</TableHead>
          <TableHead className="text-teal-500">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="text-sm text-gray-700">{payment.id}</TableCell>
            <TableCell className="text-sm text-gray-700">{payment.course.title}</TableCell>
            <TableCell className="text-sm text-gray-700">{payment.paypalOrderId}</TableCell>
            <TableCell className="text-sm text-gray-700">
              <Badge variant={'info'}>
                <Text className="!font-medium text-sky-600">{payment.status}</Text>
              </Badge>
            </TableCell>
            <TableCell className="text-tx text-gray-700">${payment.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
