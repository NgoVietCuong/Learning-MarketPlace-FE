import { Loader2, Upload } from 'lucide-react';
import { Img } from '../ui/img';
import { Text } from '../ui/text';
import { Label } from '../ui/label';
import { AspectRatio } from '../ui/aspect-ratio';

interface UploadImageProps {
  uploading: boolean;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  src: string | null;
}

export default function UploadImage({ uploading, handleChangeImage, src }: UploadImageProps) {
  return (
    <>
      <input
        type="file"
        id="course_image"
        accept="image/png, image/gif, image/jpeg, image/jpg"
        disabled={uploading}
        onChange={handleChangeImage}
      />
      <AspectRatio ratio={16 / 9}>
          {src ? (
            <Img src={src} alt="course image" className="w-full h-full object-cover rounded-md" />
          ) : (
            <Label
              htmlFor="course_image"
              className="w-full bg-white cursor-pointer font-normal border border-gray-border border-dashed rounded-md h-full flex justify-center items-center px-4 text-gray-primary bg-white-primary"
            >
              <div className="flex flex-col items-center gap-2">
                {uploading ? (
                  <>
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <Text size="sm">Uploading...</Text>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8" />
                    <div className="flex flex-col items-center gap-1">
                      <Text size="sm">Select an image or drag and drop</Text>
                      <Text size="tx" className="text-sky-700">
                        16:9 aspect ratio recommended
                      </Text>
                    </div>
                  </>
                )}
              </div>
            </Label>
          )}
      </AspectRatio>
    </>
  );
}
