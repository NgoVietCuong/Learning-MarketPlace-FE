import { Loader2, Upload, CloudUpload } from 'lucide-react';
import { Text } from '../ui/text';
import { Label } from '../ui/label';
import { AspectRatio } from '../ui/aspect-ratio';

interface UploadVideoProps {
  uploading: boolean;
  handleChangeVideo: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  selectedVideo: File | null;
}

export default function UploadVideo({ uploading, handleChangeVideo, selectedVideo }: UploadVideoProps) {
  return (
    <>
      <input
        type="file"
        id="course_video"
        disabled={uploading}
        accept="video/mp4,video/x-m4v,video/*"
        onChange={handleChangeVideo}
      />
      <AspectRatio ratio={16 / 9}>
        <Label
          htmlFor="course_video"
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
                <CloudUpload className="w-8 h-8" />
                <div className='flex flex-col items-center gap-1'>
                  <Text size="sm">Select a video or drag and drop</Text>
                  <Text size="sm" className="text-sky-700">
                    File .mp4 (5GB)
                  </Text>
                </div>
              </>
            )}

            {/* {uploading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />} */}
            {/* {uploading
              ? 'Uploading...'
              : !selectedVideo
                ? 'Select a video or drag and drop'
                : selectedVideo.name.length > 15
                  ? `${selectedVideo.name.substring(0, 14)}...`
                  : selectedVideo.name} */}
          </div>
        </Label>
      </AspectRatio>
    </>
  );
}
