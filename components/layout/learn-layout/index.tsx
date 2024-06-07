import LearnHeader from './Header';
import LessonBar from './LessonBar';
import Auth from '@/components/guard/auth';
import Learn from '@/components/guard/learn';
import { Roles } from '@/constants/enums';

interface LearnLayoutProps {
  children: React.ReactNode;
  slug: string;
  lessonId: number;
}

export default function LearnLayout({ children, slug, lessonId }: LearnLayoutProps) {
  return (
    <Auth role={Roles.STUDENT}>
      <Learn slug={slug}>
        <LearnHeader slug={slug} />
        <main className="flex w-full grow bg-white-primary box-border overflow-hidden">
          <div className="w-full flex flex-row">
            {children}
            <LessonBar slug={slug} lessonId={lessonId} />
          </div>
        </main>
      </Learn>
    </Auth>
  );
}
