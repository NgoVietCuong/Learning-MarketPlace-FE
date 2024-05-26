import { useState, Dispatch, SetStateAction } from 'react';
import { Trash2, PenLine, Plus } from 'lucide-react';
import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import LessonTable from '../table/lesson-table';
import { LessonColumns } from '../table/lesson-table/LessonColumns';
import DeleteAction from '../modal/DeleteAction';
import TitleProvider from '../modal/TitleProvider';
import useCourseDetails from '@/hooks/useCourseDetails';
import { instructorCourseApi } from '@/services/axios/instructorCourseApi';
import { Section } from '@/types/schema';

interface SectionListProps {
  sections: Section[];
  courseId: number;
}

export default function SectionList({ sections, courseId }: SectionListProps) {
  const { courseDetailsMutate } = useCourseDetails(courseId);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  const handleEditClick = (sectionId: number) => {
    setSelectedSection(sectionId);
    setEditOpen(!editOpen);
  }

  const handleDeleteClick = (sectionId: number) => {
    setSelectedSection(sectionId);
    setDeleteOpen(!deleteOpen);
  };

  return (
    <div className="w-[100%] flex flex-col gap-2">
      <Accordion
        type="multiple"
        defaultValue={sections.map((section) => section.id.toString())}
        className="w-full flex flex-col gap-3"
      >
        {sections.map((section) => (
          <>
            <AccordionItem value={section.id.toString()} className="border-none space-y-2">
              <div className="flex justify-between items-center h-[40px] bg-slate-100 rounded-md px-4">
                <div className="flex items-center gap-2">
                  <Text size="s" className="!font-medium !text-gray-600">
                    {section.title}
                  </Text>
                  <Button variant={'ghost'} className="p-0" onClick={() => handleEditClick(section.id)}>
                    <PenLine className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Button size="base" variant={'ghost'} className="p-2 text-gray-600 ">
                    <Plus className="mr-1 w-4 h-4 text-gray-600" />
                    Add Lesson
                  </Button>
                  <Button variant={'ghost'} className="p-2">
                    <Trash2 className="w-[17px] h-[17px] text-gray-600" onClick={() => handleDeleteClick(section.id)} />
                  </Button>
                  <AccordionTrigger />
                </div>
              </div>
              <AccordionContent>
                <LessonTable columns={LessonColumns} data={section.lessons} />
              </AccordionContent>
            </AccordionItem>
          </>
        ))}
      </Accordion>
      <Button
        size="sm"
        className="max-w-fit bg-teal-secondary text-white-primary active:scale-95"
        onClick={() => setCreateOpen(!createOpen)}
      >
        Add Section
      </Button>
      <TitleProvider
        header="Create section"
        open={createOpen}
        setOpen={setCreateOpen}
        apiHandler={instructorCourseApi.createSection}
        mutate={courseDetailsMutate}
        courseId={courseId}
        sectionTitle={""}
      />
      <TitleProvider
        header="Edit section"
        open={editOpen}
        setOpen={setEditOpen}
        apiHandler={(body) => instructorCourseApi.updateSection(selectedSection!, body)}
        mutate={courseDetailsMutate}
        sectionTitle={sections.find((section) => section.id === selectedSection!)?.title}
      />
      <DeleteAction
        title={'Delete Section?'}
        object={'section'}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        mutate={courseDetailsMutate}
        apiHandler={() => instructorCourseApi.deleteSection(selectedSection!)}
      />
    </div>
  );
}
