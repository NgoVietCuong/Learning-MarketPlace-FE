import NavBar from "../NavBar";
import Footer from "../Footer";
import Auth from "../../auth";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Auth>
      <NavBar />
      <main className="flex w-full flex-col items-center grow gap-[30px] bg-white-primary">
        {children}
      </main>
      <Footer />
    </Auth>
  );
};
