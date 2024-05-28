import { SquarePlay, Loader2, Upload } from 'lucide-react';
import { Text } from '../ui/text';
import { Label } from '../ui/label';

interface UploadFileProps {
  uploading: boolean;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  selectedFile: File | null;
}

export default function UploadFile({ uploading, handleChangeFile, selectedFile }: UploadFileProps) {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <Text size="sm" className="font-medium !text-gray-600">
        Course video
      </Text>
      <input
        type="file"
        id="course_video"
        disabled={uploading}
        accept="application/pdf"
        onChange={handleChangeFile}
      />
      <Label
        htmlFor="course_video"
        className="w-full bg-white font-normal border border-gray-border border-dashed rounded-md h-[36px] flex items-center px-4 text-gray-primary"
      >
        {uploading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
        {uploading
          ? 'Uploading...'
          : !selectedFile
            ? 'Select a video'
            : selectedFile.name.length > 15
              ? `${selectedFile.name.substring(0, 14)}...`
              : selectedFile.name}
      </Label>
      {/* <div className="w-full flex h-[240px] bg-slate-200 justify-center items-center rounded-md">
        <SquarePlay className="w-28 h-28 text-gray-400" />
      </div> */}
    </div>
  );
}
