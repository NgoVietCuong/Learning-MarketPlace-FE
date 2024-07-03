import { useEffect, useCallback } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Loader2 } from 'lucide-react';
import VideoPlayer from '@/components/video-player';
import PdfViewer from '@/components/pdf-viewer';
import LearnLayout from '@/components/layout/learn-layout';
import useLessonProgress from '@/hooks/fetch-data/useLessonProgress';
import useLearnProgress from '@/hooks/fetch-data/useLearnProgress';
import { LessonContentTypes } from '@/constants/enums';
import { learnApi } from '@/services/axios/learnApi';

interface LearnCourseProps {
  slug: string;
  lessonId: number;
}

export default function LearnCourse({ slug, lessonId }: LearnCourseProps) {
  const { lessonProgress, lessonLoading, lessonProgressMutate } = useLessonProgress(lessonId);
  const { learnProgress, learnProgressMutate } = useLearnProgress(slug);

  const handleUpdateLearnProgress = useCallback(async (contentProgress: number) => {
    await learnApi.updateProgress({
      enrollmentId: learnProgress?.data?.id as number,
      lessonId,
      contentProgress
    });
    learnProgressMutate();
    lessonProgressMutate();
  }, [slug, lessonId]);

  useEffect(() => {
    if (lessonProgress && !lessonProgress.data?.lessonProgress) {
      handleUpdateLearnProgress(0);
    }
  }, [lessonProgress, handleUpdateLearnProgress]);

  return (
    <div className={`grow flex flex-col items-center ${lessonLoading ? 'justify-center' : ''}`}>
      {lessonLoading ? (
        <Loader2 className="h-12 w-12 animate-spin text-gray-600" />
      ) : (
        <>
          {lessonProgress?.data?.contentType === LessonContentTypes.VIDEO && (
            <VideoPlayer
              key={lessonProgress.data.id as number}
              className="w-full"
              options={{
                sources: [
                  {
                    src: lessonProgress.data.content!,
                    type: 'application/x-mpegURL',
                  },
                ]
              }}
              lessonProgress={lessonProgress}
              apiHandler={handleUpdateLearnProgress}
            />
          )}
          {lessonProgress?.data?.contentType === LessonContentTypes.DOCUMENT && (
            <PdfViewer key={lessonProgress.data.id as number} fileUrl={lessonProgress.data.content! as string} lessonProgress={lessonProgress} apiHandler={handleUpdateLearnProgress} />
          )}
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { slug, lessonId },
  } = context;

  const idNumber = Number(lessonId);

  return {
    props: {
      slug,
      lessonId: idNumber,
    },
  };
}

LearnCourse.getLayout = function (page: React.ReactNode, pageProps: LearnCourseProps) {
  return (
    <LearnLayout slug={pageProps.slug} lessonId={pageProps.lessonId}>
      {page}
    </LearnLayout>
  );
};
