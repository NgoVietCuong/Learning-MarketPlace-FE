import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLearnProgress from '@/hooks/useLearnProgress';

interface LearnProps {
  children: React.ReactNode;
  slug: string;
}

export default function Learn({ children, slug }: LearnProps) {
  const router = useRouter();
  const { learnProgress, isLoading } = useLearnProgress(slug);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(true);
    if (!isLoading && (!learnProgress || !learnProgress.data) && router.pathname !== `/course/${slug}`) {
      router.push(`/course/${slug}`);
      return;
    }

    setIsChecking(false);
  }, [router, learnProgress, isLoading]);

  return <>{(isLoading || isChecking) ? null : children}</>;
}
