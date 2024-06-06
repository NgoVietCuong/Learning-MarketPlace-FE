import { PiMonitorPlay } from "react-icons/pi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Text } from "@/components/ui/text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function LessonBar() {
  return (
    <div className="flex flex-col min-w-[25%] w-[25%] h-[100%] z-5 border-l-[1px] border-gray-border">
      <div className="w-full p-4 border-b-[1px] border-gray-300">
        <Text size="sm" className="!font-medium !text-gray-800">Course content</Text>
      </div>
      <div className="w-full overflow-y-scroll">
        <Accordion type="multiple">
          <AccordionItem value="lesson-1" >
            <div className="flex justify-between items-start bg-slate-100 px-4 h-[60px]">
              <div className="flex flex-col gap-1.5 self-center">
                <Text size="sm" className="!font-medium !text-gray-700">
                  Bonus: Mark's Javascript Workbook
                </Text>
                <Text size="xs" className="!text-[10px]"> 1/ 1</Text>
              </div>
              <AccordionTrigger />
            </div>
            <AccordionContent>
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div>
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="lesson-1" >
            <div className="flex justify-between items-start bg-slate-100 px-4 h-[60px]">
              <div className="flex flex-col gap-1.5 self-center">
                <Text size="sm" className="!font-medium !text-gray-700">
                  Bonus: Mark's Javascript Workbook
                </Text>
                <Text size="xs" className="!text-[10px]"> 1/ 1</Text>
              </div>
              <AccordionTrigger />
            </div>
            <AccordionContent>
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div>
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              <div className="w-full flex gap-3 px-4 py-3">
                <IoIosCheckmarkCircle className="w-5 h-5 text-blue-500" />
                <div className="flex flex-col gap-1.5">
                  <Text size="tx" className="!font-normal !text-gray-700">Javascript for beginners</Text>
                  <Text size="xs" className="inline-flex items-center gap-2 !text-[11px] !text-gray-600"><PiMonitorPlay className="w-[17px] h-[17px] text-gray-600" /> 3 min</Text>
                </div>
              </div> 
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}