import UserLayout from "@/components/layout/user-layout"

export default function EditPhoto() {
  return(
    <div className="grow bg-slate-100">Edit Photo</div>
  )
}

EditPhoto.getLayout = function(page: React.ReactNode) {
  return (
    <UserLayout>
      {page}
    </UserLayout>
  )
}