import { CardContent } from '../ui/card';

type Props = {
  gender: string;
  height: number;
  weight: number;
  address: string;
};

const UserContent = ({ gender, height, weight, address }: Props) => {
  return (
    <CardContent className="text-center p-2 lg:p-4 text-sm lg:text-base">
      <p className="text-gray-500">{gender}</p>
      <p className="text-gray-700">Height: {height} cm</p>
      <p className="text-gray-700">Weight: {weight} kg</p>
      <p className="text-gray-700 overflow-hidden text-ellipsis line-clamp-2">
        {address}
      </p>
    </CardContent>
  );
};

export default UserContent;
