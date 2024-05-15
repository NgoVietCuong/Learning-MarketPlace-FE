import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@/types/schema";

export const CourseColumns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  }, 
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => (row.getValue('isPublished') ? 'Published': 'Unpublished') 
  }
]