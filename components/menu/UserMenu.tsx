import { useRouter } from 'next/router';
import { LogOut, Settings, UserRoundCheck, FilePenLine, User, BookMarked, UserCog } from 'lucide-react';
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
import { authApi } from '@/services/axios/authApi';
import useUser from '@/hooks/useUser';
import { Roles } from '@/constants/enums';

export default function UserMenu() {
  const router = useRouter();
  const { user, userMutate, hasRole } = useUser();
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
            <AvatarImage src={user?.data?.avatar ? user?.data?.avatar : undefined} />
            <AvatarFallback className="bg-slate-300 text-white-primary text-center font-medium text-sm">
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white-primary">
        <DropdownMenuLabel className="font-medium text-gray-800">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-200" />
        {hasRole(Roles.STUDENT) && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-gray-700 cursor-pointer hover:bg-slate-100"
                onClick={() => router.push('/user/my-learning')}
              >
                <BookMarked className="mr-2 h-4 w-4" />
                My learning
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-gray-700 cursor-pointer hover:bg-slate-100"
                onClick={() => router.push('/user/account-settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Account settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-200" />
          </>
        )}

        {hasRole(Roles.INSTRUCTOR) && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-gray-700 cursor-pointer hover:bg-slate-100"
                onClick={() => router.push('/instructor')}
              >
                <UserRoundCheck className="mr-2 h-4 w-4" />
                Instructor dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-gray-700 cursor-pointer hover:bg-slate-100"
                onClick={() => router.push('/instructor/profile')}
              >
                <FilePenLine className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-200" />
          </>
        )}
        {hasRole(Roles.ADMIN) && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-gray-700 cursor-pointer hover:bg-slate-100"
                onClick={() => router.push('/admin')}
              >
                <UserCog className="mr-2 h-4 w-4 text-gray-700 " />
                Admin dashboard
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-200" />
          </>
        )}
        <DropdownMenuItem className="text-gray-700 cursor-pointer hover:bg-slate-100" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
