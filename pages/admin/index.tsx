import { GetServerSidePropsContext } from 'next';
import { Heading } from '@/components/ui/heading';
import AdminLayout from '@/components/layout/admin-layout';
import { UserColumns } from '@/components/table/user-table/UserColumns';
import UserTable from '@/components/table/user-table';
import useUserList from '@/hooks/fetch-data/userUserList';

interface AdminUsersProps {
  page: string | null;
  search: string | null;
  isActive: string | null;
  role: string | null;
}

export default function AdminUsers({ page, search, isActive, role }: AdminUsersProps) {
  const { userList, isLoading, userListMutate } = useUserList(page, search, isActive, role);

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl">
        <div className="px-10 py-8 flex flex-col gap-4">
          <Heading className="!font-medium">Users</Heading>
          {!isLoading && (
            <UserTable
              columns={UserColumns(userListMutate)}
              data={userList!.data!.items}
              meta={userList!.data!.meta}
              filter={{ search, isActive, role }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { page, search, isActive, role } = query;

  return {
    props: {
      page: page || null,
      search: search || null,
      isActive: isActive || null,
      role: role || null,
    },
  };
}

AdminUsers.getLayout = function (page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
