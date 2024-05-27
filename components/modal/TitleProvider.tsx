import { Loader2 } from 'lucide-react';
import { Dispatch, useState, SetStateAction, useEffect } from 'react';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import FailedAlert from '../alert/Failed';
import { Response } from '@/types/response';

interface NameProviderProps {
  header: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  apiHandler: (body: any) => Promise<Response>;
  mutate: any;
  object: string;
  parentId?: number;
  parentField?: string;
  titleValue?: string;
}

export default function TitleProvider({ open, setOpen, header, apiHandler, object, mutate, parentId, parentField, titleValue }: NameProviderProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState(titleValue);
  const [titleError, setTitleError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (!open) setTitle('');
    else setTitle(titleValue);
    
    setSaving(false);
    setTitleError('');
    setSaveError('');
  }, [open]);

  const handleSave = async () => {
    let hasTitleError = false;
    if (!title || (title && title.trim() === '')) (hasTitleError = true), setTitleError('Section title cannot be empty');
    else (hasTitleError = false), setTitleError('');

    setSaveError('');
    if (hasTitleError) return;

    setSaving(true);
    let saveResponse;
    if (parentField) {
      saveResponse = await apiHandler({ title, [parentField]: parentId });
    } else {
      saveResponse = await apiHandler({ title })
    }
     
    if (saveResponse.error) {
      const messages = saveResponse.message;
      if (typeof messages === 'string') setSaveError(messages);
      else setSaveError(messages[0]);
    } else {
      mutate();
      toast({
        variant: 'success',
        description: `Saved ${object.toLowerCase()} successfully!`,
      });
      setOpen(false);
    }
    setSaving(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white-primary rounded-lg flex flex-col items-center pt-8 pb-5 max-w-[25%] gap-2">
        <DialogHeader className="w-[85%] flex flex-col items-center gap-2">
          <DialogTitle className="text-2xl text-gray-700 mb-[10px] text-center">{header}</DialogTitle>
          <div className="w-full flex flex-col items-start gap-1">
            <Text size="sm" className="font-medium !text-gray-600">
              {object} title<span className="text-red-500"> *</span>
            </Text>
            <Input
              type="text"
              id="section_name"
              value={title}
              placeholder="Enter section title"
              onChange={(value: string) => setTitle(value)}
            />
            {titleError && (
              <Text size="xs" as="p" className="text-red-400 font-medium">
                {titleError}
              </Text>
            )}
          </div>
        </DialogHeader>
        <div className="w-[85%] flex flex-col p-0">
          {saveError && <FailedAlert title={`${header} failed`} message={saveError} />}
        </div>
        <DialogFooter className="pt-0 flex">
          <Button
            disabled={saving}
            type="button"
            className="bg-teal-secondary text-white-primary px-[30px] active:scale-95"
            onClick={handleSave}
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
