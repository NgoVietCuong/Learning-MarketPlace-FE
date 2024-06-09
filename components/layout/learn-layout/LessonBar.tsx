import { useRouter } from 'next/router';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { FaRegCircle } from "react-icons/fa6";
import { Text } from '@/components/ui/text';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import DynamicIcon from '@/components/dynamic-icon';
import useLearnProgress from '@/hooks/useLearnProgress';
import { ContentTypes } from '@/constants/filterField';
import { secondsToMinutes } from '@/utils/timeConverter';

interface LessonBarProps {
  slug: string;
  lessonId: number;
}

export default function LessonBar({ slug, lessonId }: LessonBarProps) {
  const router = useRouter();
  const { learnProgress, learnLoading } = useLearnProgress(slug);

  return (
    <div className="flex flex-col min-w-[25%] w-[25%] h-[100%] z-5 border-l-[1px] border-gray-border">
      <div className="w-full p-4 border-b-[1px] border-gray-300">
        <Text size="sm" className="!font-medium !text-gray-800">
          Course content
        </Text>
      </div>
      {learnLoading ? (
        <></>
      ) : (
        <div className="w-full overflow-y-scroll">
          <Accordion
            type="multiple"
            defaultValue={learnProgress?.data?.course?.sections.map((section) => section.id.toString())}
          >
            {learnProgress?.data?.course?.sections.map((section) => (
              <AccordionItem value={section.id.toString()} key={section.id}>
                <div className="flex justify-between items-start bg-slate-100 px-4 h-[60px]">
                  <div className="flex flex-col gap-1.5 self-center">
                    <Text size="sm" className="!font-medium !text-gray-700">
                      {section.title}
                    </Text>
                    <Text size="xs" className="!text-[10px]">
                      {' '}
                      1/ 1
                    </Text>
                  </div>
                  <AccordionTrigger />
                </div>
                <AccordionContent>
                  {section.lessons.map((lesson) => (
                    <div key={lesson.id} className={`w-full flex gap-3 px-4 py-3 hover:bg-slate-100 cursor-pointer ${lesson.id === lessonId ? 'bg-slate-200' : ''}`} onClick={() => router.push(`/course/${slug}/learn/${lesson.id}`)}>
                      {lesson?.lessonProgress?.isCompleted ? (<IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />) :  (<FaRegCircle className="mt-[1.5px] ml-[1.6px] w-[16.25px] h-[16.25px] text-blue-500" />)}
                      <div className="flex flex-col gap-1.5">
                        <Text size="tx" className="!font-normal !text-gray-700">
                          {lesson.title}
                        </Text>
                        <Text size="xs" className="inline-flex items-center gap-1 !text-[11px] !text-gray-600">
                          <DynamicIcon className="w-[15px] h-[15px] text-gray-500" iconName={ContentTypes[lesson.contentType]}  />
                          {lesson.duration ? `${secondsToMinutes(lesson.duration)}` : 'read'}
                        </Text>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
