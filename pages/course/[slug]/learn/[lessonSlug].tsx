import { Text } from '@/components/ui/text';
import LearnLayout from '@/components/layout/learn-layout';
import VideoPlayer from '@/components/video-player';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function LearnCourse() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pdfUrl =
    'https://res.cloudinary.com/dvz7322mp/raw/upload/v1717171846/hlm-dev/lesson-document/6/yojh32bdtja8nxl2qxwx.pdf';
  return (
    <div className="grow flex flex-col">
      {/* <VideoPlayer
        className="w-full"
        options={{
          sources: [
            {
              src: 'https://res.cloudinary.com/dvz7322mp/video/upload/sp_auto/v1717171102/hlm-dev/lesson-video/2/vuo9yj6o3ibluszjgx0v.m3u8',
              type: 'application/x-mpegURL',
            },
          ],
        }}
      /> */}
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            plugins={[defaultLayoutPluginInstance]}
            defaultScale={1.5}
            theme="dark"
          />
        </Worker>

      <Text size="xl" className="!font-medium !text-gray-700 px-10 py-5">
        JavaScript Development Workbook
      </Text>
    </div>
  );
}

LearnCourse.getLayout = function (page: React.ReactNode) {
  return <LearnLayout>{page}</LearnLayout>;
};
