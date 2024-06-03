import LearnHeader from "./Header";
import Footer from "../Footer";
import Auth from "@/components/auth";
import { Roles } from "@/constants/enums";

interface LearnLayoutProps {
  children: React.ReactNode;
}

export default function LearnLayout({ children }: LearnLayoutProps) {
  return(
    <Auth role={Roles.STUDENT}>
      <LearnHeader />
      <main className="flex w-full flex-col items-center grow gap-[30px] bg-white-primary">
        {children}
      </main>
      <Footer />
    </Auth>
  )
}