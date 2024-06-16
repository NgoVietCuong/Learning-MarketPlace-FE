import AdminSideBar from "./SideBar";
import Auth from "@/components/guard/auth";
import { Roles } from "@/constants/enums";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Auth role={Roles.ADMIN}>
      <main className="w-full flex grow bg-slate-100 overflow-hidden box-border">
        <div className="w-full flex flex-row">
          <AdminSideBar />
          {children}
        </div>
      </main>
    </Auth>
  );
} 