import { Loader2 } from 'lucide-react';
import { Dispatch, useState, SetStateAction, useEffect, ChangeEvent  } from 'react';
import { Rate } from 'antd';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import FailedAlert from '../alert/Failed';
import { Response } from '@/types/response';

interface RatingProviderProps {
  header: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  apiHandler: (body: any) => Promise<Response>;
  mutate: any;
  ratingValue?: number;
  commentValue?: string;
  enrollmentId: number;
}

export default function RatingProvider({ open, setOpen, header, apiHandler, mutate, ratingValue, commentValue }: RatingProviderProps) {
  const [rating, setRating] = useState(ratingValue);
  const [comment, setComment] = useState(commentValue);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (!open) setRating(undefined), setComment('');
    else setRating(ratingValue), setComment(commentValue);

    setSaving(false);
    setSaveError('');
  }, [open]);

  const handleSave = async () => {
    setSaving(true);

    setSaving(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white-primary rounded-lg flex flex-col items-center pt-8 pb-5 max-w-[25%] gap-2">
        <DialogHeader className="w-[90%] flex flex-col items-center gap-2">
          <DialogTitle className="text-2xl text-gray-700 mb-[10px] text-center">{header}</DialogTitle>
          <div className="w-full space-y-4">
            <Rate className="text-4xl text-yellow-500" value={rating} onChange={(value: number) => setRating(value)} />
            <Textarea
              placeholder="Write about your own personal experience taking this course."
              className="min-h-[100px]"
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)}
            />
          </div>
        </DialogHeader>
        <div className="w-[85%] flex flex-col p-0">
          {saveError && <FailedAlert title={`${header} failed`} message={saveError} />}
        </div>
        <DialogFooter className="pt-0 flex">
          <Button
            disabled={saving || !rating || !comment}
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
