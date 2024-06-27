import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'COMPLETED',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'COMPLETED',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'COMPLETED',
  },
  // {
  //   invoice: "INV004",
  //   paymentStatus: "Paid",
  //   totalAmount: "$450.00",
  //   paymentMethod: "Credit Card",
  // },
  // {
  //   invoice: "INV005",
  //   paymentStatus: "Paid",
  //   totalAmount: "$550.00",
  //   paymentMethod: "PayPal",
  // },
  // {
  //   invoice: "INV006",
  //   paymentStatus: "Pending",
  //   totalAmount: "$200.00",
  //   paymentMethod: "Bank Transfer",
  // },
  // {
  //   invoice: "INV007",
  //   paymentStatus: "Unpaid",
  //   totalAmount: "$300.00",
  //   paymentMethod: "Credit Card",
  // },
];

export function PaymentTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-teal-500">Course Title</TableHead>
          <TableHead className="text-teal-500">Order Id</TableHead>
          <TableHead className="text-teal-500">Status</TableHead>
          <TableHead className="text-teal-500">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="text-sm text-gray-700">{invoice.invoice}</TableCell>
            <TableCell className="text-sm text-gray-700">{invoice.paymentStatus}</TableCell>
            <TableCell className="text-sm text-gray-700">
              <Badge variant={'info'}>
                <Text className="!font-medium text-sky-600">{invoice.paymentMethod}</Text>
              </Badge>
            </TableCell>
            <TableCell className="text-tx text-gray-700">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
