import { Heading } from '@/components/ui/heading';
import AdminLayout from '@/components/layout/admin-layout';
import { UserColumns } from '@/components/table/user-table/UserColumns';
import UserTable from '@/components/table/user-table';
import useUserList from '@/hooks/userUserList';

export default function AdminUsers() {
  const { userList, isLoading, userListMutate } = useUserList();

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl">
        <div className="px-10 py-8 flex flex-col gap-4">
          <Heading className="!font-medium">Users</Heading>
          {!isLoading && (
            <UserTable columns={UserColumns} data={userList!.data!.items} meta={userList!.data!.meta} />
          )}
        </div>
      </div>
    </div>
  );
}

AdminUsers.getLayout = function (page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
