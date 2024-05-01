import { useRouter } from 'next/router';
import { LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types/schema';
import { authApi } from '@/services/axios/authApi';

interface UserMenuProps {
  user: User;
  userMutate: any;
}

export default function UserMenu({ user, userMutate }: UserMenuProps) {
  const router = useRouter();
  const handleLogout = async () => {
    const logoutResponse = await authApi.logout();
    if (!logoutResponse.error) {
      userMutate();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="flex items-center gap-7 p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar ? user.avatar : undefined} />
            <AvatarFallback className="bg-teal-secondary text-white-primary text-center font-medium text-sm">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white-primary">
        <DropdownMenuLabel className="font-medium">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className=" bg-slate-200" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-gray-700" onClick={() => router.push('/user/edit-account')}>
            <Settings className="mr-2 h-4 w-4" />
            Account settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem className="text-gray-700" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
