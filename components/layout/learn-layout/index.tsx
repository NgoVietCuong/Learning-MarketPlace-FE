import LearnHeader from './Header';
import LessonBar from './LessonBar';
import Auth from '@/components/auth';
import { Roles } from '@/constants/enums';

interface LearnLayoutProps {
  children: React.ReactNode;
}

export default function LearnLayout({ children }: LearnLayoutProps) {
  return (
    <Auth role={Roles.STUDENT}>
      <LearnHeader />
      <main className="flex w-full grow bg-white-primary box-border overflow-hidden">
        <div className="w-full flex flex-row">
          {children}
          <LessonBar />
        </div>
      </main>
    </Auth>
  );
}
