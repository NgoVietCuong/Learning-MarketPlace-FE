import { ImageOff, Loader2, Upload } from 'lucide-react';
import { Text } from '../ui/text';
import { Label } from '../ui/label';

interface UploadImageProps {
  uploading: boolean;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  selectedImage: File | null;
}

export default function UploadImage({ uploading, handleChangeImage, selectedImage }: UploadImageProps) {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <Text size="sm" className="font-medium !text-gray-600">
        Course image
      </Text>
      <input
        type="file"
        id="course_image"
        accept="image/png, image/gif, image/jpeg, image/jpg"
        disabled={uploading}
        onChange={handleChangeImage}
      />
      <Label
        htmlFor="course_image"
        className="w-full bg-white font-normal border border-gray-border border-dashed rounded-md h-[36px] flex items-center px-4 text-gray-primary"
      >
        {uploading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
        {uploading
          ? 'Uploading...'
          : !selectedImage
            ? 'Select an image'
            : selectedImage.name.length > 15
              ? `${selectedImage.name.substring(0, 14)}...`
              : selectedImage.name}
      </Label>
      {/* <div className="w-full flex h-[220px] bg-slate-200 justify-center items-center rounded-md">
        <ImageOff className="w-28 h-28 text-gray-400" />
      </div> */}
    </div>
  );
}
