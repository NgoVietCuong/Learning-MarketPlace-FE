import Footer from './Footer';
import NavBar from './NavBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <NavBar />
      <main className="flex w-full flex-col items-center grow gap-[30px] bg-white-primary">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
