import InstructorSideBar from './SideBar';
import Footer from '../Footer';

interface InstructorLayoutProps {
  children: React.ReactNode;
}

export default function InstructorLayout({ children }: InstructorLayoutProps) {
  return (
    <>
      <main className="w-full flex grow bg-slate-100">
        <div className="w-full flex flex-row h-full">
          <InstructorSideBar />
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
