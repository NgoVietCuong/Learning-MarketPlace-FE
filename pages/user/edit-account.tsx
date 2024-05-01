import UserLayout from '@/components/layout/user-layout';

export default function EditAccount() {
  return (
    <div className="grow bg-white-primary shadow-lg rounded-lg">
      <div className="w-full py-4 px-3">Edit Account</div>
    </div>
  );
}

EditAccount.getLayout = function (page: React.ReactNode) {
  return <UserLayout>{page}</UserLayout>;
};
