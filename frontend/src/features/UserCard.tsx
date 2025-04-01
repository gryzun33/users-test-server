import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import IconButton from '@/components/IconButton';
import { User } from '@/types/user';
import DeleteUserModal from './DeleteUserModal';
import EditModal from './EditModal';
import { useDispatch } from 'react-redux';
import { setUserId } from '@/store/slices/userSlice';
import { getPhotoUrl } from '@/utils/getPhotoUrl';
import UserImage from '@/components/CardComponents/UserImage';
import UserContent from '@/components/CardComponents/UserContent';

const UserCard = ({ ...user }: User) => {
  const dispatch = useDispatch();

  const photoUrl = getPhotoUrl(user.photo);

  const handleEditClick = () => {
    dispatch(setUserId(user.id));
  };

  return (
    <>
      <Card className="group relative bg-white shadow-md rounded-lg w-60 lg:w-70 xl:w-full">
        <UserImage
          photoUrl={photoUrl}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <CardTitle className="self-center mt-1 lg:mt-2 px-2 text-lg lg:text-xl text-center text-slate-800 overflow-hidden text-ellipsis line-clamp-2 break-all">
          {user.firstName} {user.lastName}
        </CardTitle>

        <UserContent
          gender={user.gender}
          height={user.height}
          weight={user.weight}
          address={user.address}
        />

        <CardFooter className="flex justify-end gap-2 items-center mt-auto">
          <EditModal>
            <IconButton Icon={Pencil} onClick={handleEditClick} />
          </EditModal>
          <DeleteUserModal userId={user.id}>
            <IconButton Icon={Trash2} />
          </DeleteUserModal>
        </CardFooter>
      </Card>
    </>
  );
};

export default UserCard;
