// import axios from "axios";
import { useState, useEffect } from 'react';
import { Loader2, CloudUpload } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLock, FiCheckSquare } from 'react-icons/fi';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components//ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import AvatarSkeleton from '@/components/skeleton/AvatarSkeleton';
import FailedAlert from '@/components/alert/Failed';
import { userApi } from '@/services/axios/userApi';
import { uploadApi } from '@/services/axios/uploadApi';
import useUser from '@/hooks/useUser';

export default function changeAvatar() {
  const { user, isLoading, userMutate } = useUser();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState('');

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

  const handleOpenModal = () => setOpen(!open);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    formData.append('public_id_prefix', `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}/${user?.data?.id}/avatar`);

    setUploading(true);
    const uploadResponse = await uploadApi.uploadImage(formData);
    console.log('uploadResponse', uploadResponse)
    setUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          id="change_password_trigger"
          className="text-white-primary bg-teal-secondary active:scale-[98%]"
          onClick={handleOpenModal}
        >
          Change
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white-primary rounded-lg flex flex-col items-center pt-8 pb-8 max-w-[25%] gap-3">
        <DialogTitle className="text-2xl text-gray-700 mb-[15px]">Change Avatar</DialogTitle>
        <DialogHeader className="w-[85%] flex flex-col items-center gap-3">
          <div className="w-full flex flex-col items-center gap-5 ">
            {isLoading ? (
              <AvatarSkeleton />
            ) : (
              <Avatar className="h-32 w-32 shadow-avatar">
                <AvatarImage src={user?.data?.avatar ? user.data.avatar : undefined} />
                <AvatarFallback className="bg-teal-secondary text-white-primary text-center font-medium text-sm">
                  {user?.data?.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <input
              type="file"
              name="file"
              id="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
            <Label
              htmlFor="file"
              className="bg-slate-200 text-gray-700 px-[25px] py-[8px] rounded-md inline-flex items-center gap-2"
            >
              <CloudUpload className="w-5 h-5" />
              Choose a file
            </Label>
          </div>
        </DialogHeader>

        <div className="w-[85%] flex flex-col items-center p-0">
          {saveError && <FailedAlert title={'Changed password failed'} message={saveError} />}
        </div>

        <DialogFooter>
          <div className="flex items-center gap-3">
            <Button
              disabled={!avatar}
              type="button"
              className="bg-teal-secondary text-white-primary px-[30px] active:scale-95"
              // onClick={handleUpdatePassword}
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
