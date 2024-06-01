import { Loader2, Upload, CloudUpload } from 'lucide-react';
import { Text } from '../ui/text';
import { Label } from '../ui/label';
import { AspectRatio } from '../ui/aspect-ratio';
import VideoPlayer from '../video-player';

interface UploadVideoProps {
  uploading: boolean;
  handleChangeVideo: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  src: string | null;
}

export default function UploadVideo({ uploading, handleChangeVideo, src }: UploadVideoProps) {
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
        {src ? (
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
        ) : (
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
                  <div className="flex flex-col items-center gap-1">
                    <Text size="sm">Select a video or drag and drop</Text>
                    <Text size="tx" className="text-sky-700">
                      File .mp4 (5GB)
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
