import { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { Loader2 } from 'lucide-react';
import VideoPlayer from '@/components/video-player';
import PdfViewer from '@/components/pdf-viewer';
import LearnLayout from '@/components/layout/learn-layout';
import useLessonProgress from '@/hooks/useLessonProgress';
import useLearnProgress from '@/hooks/useLearnProgress';
import { LessonContentTypes } from '@/constants/enums';
import { learnApi } from '@/services/axios/learnApi';

interface LearnCourseProps {
  slug: string;
  lessonId: number;
}

export default function LearnCourse({ slug, lessonId }: LearnCourseProps) {
  const { lessonProgress, lessonLoading, lessonProgressMutate } = useLessonProgress(lessonId);
  const { learnProgress, learnProgressMutate } = useLearnProgress(slug);

  useEffect(() => {
    if (lessonProgress && !lessonProgress.data?.lessonProgress) {
      handleUpdateLearnpProgress(0);
    }
  }, [lessonProgress]);

  const handleUpdateLearnpProgress = async (contentProgress: number) => {
    await learnApi.updateProgress({
      enrollmentId: learnProgress?.data?.id as number,
      lessonId,
      contentProgress
    });
    learnProgressMutate();
    lessonProgressMutate();
  }

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
              apiHandler={handleUpdateLearnpProgress}
            />
          )}
          {lessonProgress?.data?.contentType === LessonContentTypes.DOCUMENT && (
            <PdfViewer key={lessonProgress.data.id as number} fileUrl={lessonProgress.data.content! as string} lessonProgress={lessonProgress} apiHandler={handleUpdateLearnpProgress} />
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
