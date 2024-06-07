import { GetServerSidePropsContext } from 'next';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Loader2 } from 'lucide-react';
import { Text } from '@/components/ui/text';
import VideoPlayer from '@/components/video-player';
import LearnLayout from '@/components/layout/learn-layout';
import useLessonProgress from '@/hooks/useLessonProgress';
import { LessonContentTypes } from '@/constants/enums';

interface LearnCourseProps {
  slug: string;
  lessonId: number;
}

export default function LearnCourse({ slug, lessonId }: LearnCourseProps) {
  const { lessonProgress, lessonLoading } = useLessonProgress(lessonId);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pdfUrl =
    'https://res.cloudinary.com/dvz7322mp/raw/upload/v1717171846/hlm-dev/lesson-document/6/yojh32bdtja8nxl2qxwx.pdf';

  return (
    <div className={`grow flex flex-col items-center ${lessonLoading ? 'justify-center' : ''}`}>
      {lessonLoading ? (
        <Loader2 className="h-12 w-12 animate-spin text-gray-600" />
      ) : (
        <>
          {lessonProgress?.data?.contentType === LessonContentTypes.VIDEO && (
            <VideoPlayer
              className="w-full"
              options={{
                sources: [
                  {
                    src: lessonProgress.data.content!,
                    type: 'application/x-mpegURL',
                  },
                ],
              }}
            />
          )}
          {lessonProgress?.data?.contentType === LessonContentTypes.DOCUMENT && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={lessonProgress.data.content!} plugins={[defaultLayoutPluginInstance]} defaultScale={1.5} theme="dark" />
            </Worker>
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
