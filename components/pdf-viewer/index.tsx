import { useEffect, useRef } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { LessonProgressDetails } from '@/types/schema';
import { Response } from '@/types/response';

interface PdfViewerProps {
  fileUrl: string;
  lessonProgress: Response<LessonProgressDetails>,
  apiHandler: (progress: number) => Promise<void>
}

export default function PdfViewer({ fileUrl, lessonProgress, apiHandler }: PdfViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const viewerRef = useRef<HTMLDivElement | null>(null);
  let timeoutRef: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleScroll = (viewerContainer: Element) => {
      const { scrollTop, scrollHeight, clientHeight } = viewerContainer;

      const scrollPosition = (scrollTop + clientHeight) / scrollHeight;
      if (scrollPosition === 1) {
        if (!lessonProgress?.data?.lessonProgress || !lessonProgress.data.lessonProgress.isCompleted) {            
          if (timeoutRef) {
            clearTimeout(timeoutRef);
          }
          timeoutRef = setTimeout(async () => {
            await apiHandler(100);
          }, 300);
        }
      }
    };

    setTimeout(() => {
      const viewerContainer = viewerRef.current?.querySelector('.rpv-core__inner-pages');
      if (viewerContainer) {
        viewerContainer.addEventListener('scroll', () => handleScroll(viewerContainer));
      }
  
      return () => {
        if (viewerContainer) {
          viewerContainer.removeEventListener('scroll', () => handleScroll(viewerContainer));
        }
      };
    }, 800);
  }, [viewerRef]);

  return (
    <div ref={viewerRef} style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} defaultScale={1.5} theme="dark" />
      </Worker>
    </div>
  );
}
