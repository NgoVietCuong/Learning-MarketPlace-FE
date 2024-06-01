import { SquarePlay, Loader2, Upload } from 'lucide-react';
import { Label } from '../ui/label';

interface UploadFileProps {
  uploading: boolean;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  selectedFile: File | null;
}

export default function UploadFile({ uploading, handleChangeFile, selectedFile }: UploadFileProps) {
  return (
    <>
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
            ? 'Select a file (.pdf only)'
            : selectedFile.name.length > 15
              ? `${selectedFile.name.substring(0, 14)}...`
              : selectedFile.name}
      </Label>
    </>
  );
}
