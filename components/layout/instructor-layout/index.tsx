import InstructorSideBar from './SideBar';
import Auth from '../../auth';
import { Roles } from '@/constants/enums';

interface InstructorLayoutProps {
  children: React.ReactNode;
}

export default function InstructorLayout({ children }: InstructorLayoutProps) {
  return (
    <Auth role={Roles.INSTRUCTOR}>
      <main className="w-full flex grow bg-slate-100 overflow-hidden box-border">
        <div className="w-full flex flex-row">
          <InstructorSideBar />
          {children}
        </div>
      </main>
    </Auth>
  );
}
