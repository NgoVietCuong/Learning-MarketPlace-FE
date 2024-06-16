import { useRouter } from 'next/router';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { CircleCheck, Ban, UserRoundCheck, UserRoundX } from 'lucide-react';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ChangeUserStatus from '@/components/modal/ChangeUserStatus';
import { User, Role } from '@/types/schema';
import useUserList from '@/hooks/userUserList';
import { adminApi } from '@/services/axios/adminApi';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

export const UserColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'username',
    header: () => (
      <Text size="xs" className="font-medium pl-5">
        User name
      </Text>
    ),
    cell: ({ row }) => (
      <Text size="sm" className="!font-medium !text-gray-600 pl-5">
        {row.getValue('username')}
      </Text>
    ),
  },
  {
    accessorKey: 'email',
    header: () => (
      <Text size="xs" className="font-medium">
        Email
      </Text>
    ),
    cell: ({ row }) => (
      <Text size="sm" className="!font-medium !text-gray-600">
        {row.getValue('email')}
      </Text>
    ),
  },
  {
    accessorKey: 'isActive',
    header: () => (
      <Text size="xs" className="font-medium">
        Status
      </Text>
    ),
    cell: ({ row }) =>
      row.getValue('isActive') ? (
        <div className="flex gap-1 items-center">
          <CircleCheck className="w-4 h-4 text-teal-500" />
          <Text size="sm" as="p" className="!text-gray-600">
            Active
          </Text>
        </div>
      ) : (
        <div className="flex gap-1 items-center">
          <Ban className="w-[15px] h-[15px] text-red-500" />
          <Text size="sm" as="p" className="!text-gray-600">
            Inactive
          </Text>
        </div>
      ),
  },
  {
    accessorKey: 'roles',
    header: () => (
      <Text size="xs" className="font-medium">
        Roles
      </Text>
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        {(row.getValue('roles') as Role[]).map((role) => (
          <Badge variant={'info'} key={role.id}>
            <Text className="!font-medium text-sky-600">{role.name}</Text>
          </Badge>
        ))}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => (
      <Text size="xs" className="font-medium">
        Actions
      </Text>
    ),
    cell: ({ row }) => {
      const router = useRouter();
      const { toast } = useToast();
      const { userListMutate } = useUserList();
      const [banOpen, setBanOpen] = useState(false);
      const [unbanOpen, setUnbanOpen] = useState(false);

      return (
        <div className="flex flex-start">
          {row.getValue('isActive') ? (
            <Button
              size="sm"
              variant="outline"
              className="h-[32px] my-[2px] text-red-500 border-red-500 !py-0 active:scale-[98%]"
              onClick={() => setBanOpen(true)}
            >
              <UserRoundX className="w-[16px] h-[16px] text-red-500 mr-2" />
              Ban
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="h-[32px] my-[2px] text-teal-500 border-teal-500 !py-0 active:scale-[98%]"
              onClick={() => setUnbanOpen(true)}
            >
              <UserRoundCheck className="w-[16px] h-[16px] text-teal-500 mr-2" />
              Unban
            </Button>
          )}
          <ChangeUserStatus
            open={banOpen}
            setOpen={setBanOpen}
            title={'Ban User?'}
            action={'Ban'}
            message={'Are you sure you want to ban this user? This user won\'t be able to login, view courses or study anymore.'}
            mutate={userListMutate}
            apiHandler={() => adminApi.changeUserStatus(row.original.id, { isActive: false })}
          />
          <ChangeUserStatus
            open={unbanOpen}
            setOpen={setUnbanOpen}
            title={'Unban User?'}
            action={'Unban'}
            message={'Are you sure you want to unban this user? This user will be able to login, view courses and study again.'}
            mutate={userListMutate}
            apiHandler={() => adminApi.changeUserStatus(row.original.id, { isActive: true })}
          />
        </div>
      );
    },
  },
];
