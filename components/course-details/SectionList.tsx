import { Trash2 } from 'lucide-react';
import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Section } from '@/types/schema';

interface SectionListProps {
  sections: Section[];
}

export default function SectionList({ sections }: SectionListProps) {
  console.log('section', sections);
  return (
    <>
      <Accordion type="multiple" className="w-full flex flex-col gap-3">
        {sections.map((section) => (
          <AccordionItem value="item-1" className='border-none'>
            <div className="flex justify-between h-[35px]">
              <Text size="s" className="!font-medium !text-gray-600">
                {section.title}
              </Text>
              <div className="flex gap-3">
                <Button variant={'ghost'} className="p-0"><Trash2 className="w-4 h-4" /></Button>
                <Button variant={'ghost'} className="p-0"><Trash2 className="w-4 h-4" /></Button>
                <AccordionTrigger />
              </div>
            </div>
            <AccordionContent>

            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
