import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TopIncomeCourseTableProps {
  data: { id: number; title: string; amount: number }[];
}

export function TopCourseIncomeTable({ data }: TopIncomeCourseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="flex justify-between h-8">
          <TableHead className="text-teal-500">Course title</TableHead>
          <TableHead className="text-teal-500">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((course) => (
          <TableRow key={course.id} className="flex justify-between">
            <TableCell className="text-gray-800">{course.title}</TableCell>
            <TableCell className="text-gray-800">${course.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
