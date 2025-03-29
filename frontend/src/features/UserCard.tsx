import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <Card className="bg-white shadow-md rounded-lg w-70 xl:w-full">
      <CardHeader className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        {user.photo ? (
          <img
            src={user.photo}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Photo
          </div>
        )}
      </CardHeader>

      <CardContent className="text-center">
        <CardTitle>
          {user.firstName} {user.lastName}
        </CardTitle>

        <p className="text-gray-500">{user.gender}</p>
        <p className="text-gray-700">Height: {user.height} cm</p>
        <p className="text-gray-700">Weight: {user.weight} kg</p>
        <p className="text-gray-700">Address: {user.address}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center mt-auto">
        <IconButton onClick={handleEdit} Icon={Pencil} />
        <IconButton onClick={handleDelete} Icon={Trash2} />
      </CardFooter>
    </Card>
  );
};

export default UserCard;
