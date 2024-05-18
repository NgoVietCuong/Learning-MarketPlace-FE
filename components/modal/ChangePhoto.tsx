import { useState, useEffect } from 'react';
import { User, Loader2, CloudUpload } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import AvatarSkeleton from '@/components/skeleton/AvatarSkeleton';
import FailedAlert from '@/components/alert/Failed';
import { uploadApi } from '@/services/axios/uploadApi';
import { Response } from '@/types/response';
import { User as UserSchema } from '@/types/schema';
import { InstructorProfile } from '@/types/schema';

interface ChangePhotoProps {
  title: string;
  field: 'avatar' | 'picture';
  object: Response<UserSchema> | Response<InstructorProfile> | undefined;
  isLoading: boolean;
  mutate: any;
  apiHandler: (body: any) => Promise<Response>;
}

export default function ChangePhoto({ title, field, object, isLoading, mutate, apiHandler }: ChangePhotoProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    setUploading(false);
    setUploadError('');

    setSaving(false);
    setSaveError('');
  }, [open]);

  useEffect(() => {
    if (object) {
      if (field === 'picture') {
        setPhoto((object.data! as InstructorProfile)[field]);
      } else {
        setPhoto((object.data! as UserSchema)[field]);
      }
    }
  }, [isLoading]);

  const handleOpenModal = () => setOpen(!open);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    formData.append('public_id_prefix', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}/${field}/${object?.data?.id}`);

    setUploading(true);
    const uploadResponse = await uploadApi.uploadImage(formData);
    if (uploadResponse.error) {
      setUploadError(uploadResponse.error.message);
    } else {
      setSelectedFile(file);
      setPhoto(uploadResponse.secure_url as string);
    }
    setUploading(false);
  };

  const handleSavePhoto = async () => {
    setSaving(true);
    const savePhotoResponse = await apiHandler({ [`${field}`]: photo });
    if (savePhotoResponse.error) {
      setSaveError(savePhotoResponse.message);
    } else {
      mutate();
      setOpen(false);
      toast({
        variant: 'success',
        description: `Your ${field} has been changed!`,
      });
    }
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size='sm'
          id="change_password_trigger"
          className="text-white-primary bg-teal-secondary active:scale-[98%]"
          onClick={handleOpenModal}
        >
          Change
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white-primary rounded-lg flex flex-col items-center pt-8 pb-8 max-w-[25%] gap-3">
        <DialogTitle className="text-2xl text-gray-700 mb-[15px]">{title}</DialogTitle>
        <DialogHeader className="w-[85%] flex flex-col items-center gap-3">
          <div className="w-full flex flex-col items-center gap-5 ">
            {isLoading ? (
              <AvatarSkeleton />
            ) : (
              <Avatar className="h-32 w-32 shadow-avatar border-4 border-white-primary">
                <AvatarImage src={photo ? photo : undefined} />
                <AvatarFallback className="bg-slate-300 text-white-primary text-center font-medium text-5xl">
                  {uploading ? <Loader2 className="h-8 w-8 animate-spin" /> : <User className="w-20 h-20" />}
                </AvatarFallback>
              </Avatar>
            )}
            <input
              type="file"
              name="file"
              id="upload_file"
              disabled={uploading}
              accept="image/png, image/gif, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
            <Label
              htmlFor="upload_file"
              className="bg-slate-200 text-gray-700 px-[25px] py-[8px] rounded-md inline-flex items-center gap-2"
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CloudUpload className="w-5 h-5" />}
              {uploading
                ? 'Uploading'
                : !selectedFile
                  ? 'Choose a file'
                  : selectedFile.name.length > 15
                    ? `${selectedFile.name.substring(0, 14)}...`
                    : selectedFile.name}
            </Label>
          </div>
        </DialogHeader>

        <div className="w-[85%] flex flex-col items-center p-0">
          {uploadError && <FailedAlert title={'Upload image failed'} message={uploadError} />}
          {saveError && <FailedAlert title={'Save image failed'} message={saveError} />}
        </div>

        <DialogFooter>
          <div className="flex items-center gap-3">
            <Button
              disabled={!selectedFile}
              type="button"
              className="bg-teal-secondary text-white-primary px-[30px] active:scale-95"
              onClick={handleSavePhoto}
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
