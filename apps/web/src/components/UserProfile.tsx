import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthGuard from '@/hoc/AuthGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const imgSrc = `https://ui-avatars.com/api/?name=${user.fullName}&background=0D8ABC&color=fff`;

  function handleLogout() {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/');
  }

  return (
    <section className="mt-2">
      {/* <!-- Profile menu --> */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={imgSrc} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user.fullName}</DropdownMenuItem>
          {user.role === 'Admin' && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push('/form')}
              >
                Jurnal Buku
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push('/write')}
              >
                Form
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default UserProfile