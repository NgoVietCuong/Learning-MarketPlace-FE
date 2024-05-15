import { ColumnDef } from "@tanstack/react-table";
import { Text } from "../ui/text";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Category, Course } from "@/types/schema";

export const CourseColumns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: () => <Text size="xs" className="font-medium">Title</Text>,
    cell: ({ row }) => <Text size='tx' className="!font-medium !text-gray-600">{row.getValue('title')}</Text>
  },
  {
    accessorKey: "price",
    header: () => <Text size="xs" className="font-medium">Type</Text>,
    cell: ({ row }) => (row.getValue('price') ? <Badge variant={"active"} className="font-medium text-emerald-600">Paid</Badge> : <Badge variant={"info"}><Text className="font-medium text-sky-600">Free</Text></Badge>) 
  },
  {
    accessorKey: "isPublished",
    header: () => <Text size="xs" className="font-medium">Status</Text>,
    cell: ({ row }) => (<div>
      {row.getValue('isPublished') ? <Badge variant={"active"} className="font-medium text-emerald-600">Published</Badge> : <Badge variant={"inactive"}><Text className="font-medium text-gray-500">Unpublished</Text></Badge>}
    </div>)
  },
  {
    accessorKey: "categories",
    header: () => <Text size="xs" className="font-medium">Categories</Text>,
    cell: ({ row }) => <Text size='tx' className="font-normal !text-gray-primary ">{(row.getValue('categories') as Category[]).map((category) => category.name).join(", ")}</Text>
  },
 
  {
    id: "actions",
    header: () => <Text size="xs" className="font-medium">Actions</Text>,
    cell: () => <div><Button variant={'ghost'}>Edit</Button></div>
  }
]