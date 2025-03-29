import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import IconButton from '@/components/IconButton';
import { User } from '@/types/user';

const UserCard = ({ ...user }: User) => {
  const handleEdit = () => {
    console.log('edit card');
  };

  const handleDelete = () => {
    console.log('delete card');
  };

  return (
    <Card className="group relative bg-white shadow-md rounded-lg w-70 xl:w-full">
      <div className="self-center group relative w-40 h-40 overflow-hidden rounded-full border-2 border-slate-300">
        {user.photo ? (
          <img
            src={user.photo}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Photo
          </div>
        )}
      </div>
      <CardTitle className="self-center mt-2 px-2 text-xl text-center text-slate-800 overflow-hidden text-ellipsis line-clamp-2 break-all">
        {user.firstName} {user.lastName}
      </CardTitle>

      <CardContent className="text-center p-4">
        <p className="text-gray-500">{user.gender}</p>
        <p className="text-gray-700">Height: {user.height} cm</p>
        <p className="text-gray-700">Weight: {user.weight} kg</p>
        <p className="text-gray-700 overflow-hidden text-ellipsis line-clamp-2">
          {user.address}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 items-center mt-auto">
        <IconButton onClick={handleEdit} Icon={Pencil} />
        <IconButton onClick={handleDelete} Icon={Trash2} />
      </CardFooter>
    </Card>
  );
};

export default UserCard;
