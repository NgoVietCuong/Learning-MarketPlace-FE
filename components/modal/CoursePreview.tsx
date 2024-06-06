import {  Dispatch, SetStateAction } from 'react';
import { Heading } from '../ui/heading';
import VideoPlayer from '../video-player';
import { AspectRatio } from '../ui/aspect-ratio';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CoursePreviewProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  src: string;
}

export default function CoursePreview({ open, setOpen, src }: CoursePreviewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white-primary rounded-lg flex flex-col py-6 max-w-[30%] gap-5">
        <DialogTitle className="text-s text-gray-700">Course preview</DialogTitle>
        <AspectRatio ratio={16 / 9}>
          <VideoPlayer
            className="w-full"
            options={{
              sources: [
                {
                  src: src,
                  type: 'application/x-mpegURL',
                },
              ],
            }}
          />
        </AspectRatio>
      </DialogContent>
    </Dialog>
  );
}
