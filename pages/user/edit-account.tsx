import UserLayout from "@/components/layout/user-layout"

export default function EditAccount() {
  return (
    <div className="grow bg-white-primary shadow-lg rounded-lg">
      Edit Account
    </div>
  )
}

EditAccount.getLayout = function(page: React.ReactNode) {
  return (
    <UserLayout>
      {page}
    </UserLayout>
  )
}