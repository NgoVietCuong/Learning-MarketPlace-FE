import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLearnProgress from '@/hooks/fetch-data/useLearnProgress';
import useLessonProgress from '@/hooks/fetch-data/useLessonProgress';

interface LearnProps {
  children: React.ReactNode;
  slug: string;
  lessonId: number;
}

export default function Learn({ children, slug, lessonId }: LearnProps) {
  const router = useRouter();
  const { learnProgress, learnLoading } = useLearnProgress(slug);
  const { lessonProgress, lessonLoading } = useLessonProgress(lessonId);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(true);
    if (!learnLoading && (!learnProgress || !learnProgress.data) && router.pathname !== `/course/${slug}`) {
      router.push(`/course/${slug}`);
      return;
    }

    if (!lessonLoading && (!lessonProgress || !lessonProgress.data) && router.pathname !== `/course/${slug}`) {
      router.push(`/course/${slug}`);
      return;
    }

    setIsChecking(false);
  }, [router, learnProgress, learnLoading, lessonLoading]);

  return <>{(learnLoading || isChecking) ? null : children}</>;
}
