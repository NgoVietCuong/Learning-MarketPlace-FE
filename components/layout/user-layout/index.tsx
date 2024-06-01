import NavBar from '../NavBar';
import Footer from '../Footer';
import UserSideBar from './SideBar';
import Auth from '../../auth';
import { Roles } from '@/constants/enums';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <Auth role={Roles.STUDENT}>
      <NavBar />
      <main className="w-full flex grow bg-slate-100">
        <div className='w-[90%] h-full mx-auto'>
          <div className="m-auto flex flex-row h-full px-[150px] py-14 gap-9">
            <UserSideBar />
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </Auth>
  );
}
