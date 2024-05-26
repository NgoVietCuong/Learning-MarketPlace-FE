import InstructorSideBar from './SideBar';

interface InstructorLayoutProps {
  children: React.ReactNode;
}

export default function InstructorLayout({ children }: InstructorLayoutProps) {
  return (
    <>
      <main className="w-full flex grow bg-slate-100 overflow-hidden box-border">
        <div className="w-full flex flex-row">
          <InstructorSideBar />
          {children}
        </div>
      </main>
    </>
  );
}
