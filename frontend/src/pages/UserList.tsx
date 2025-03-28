import { useGetUsersQuery } from '@/api/userApi';
import UserCard from '@/features/UserCard';
import { User } from '@/types/user';

const UserList = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users!</div>;
  }
  console.log('data=', data);
  return (
    <div className="mx-auto max-w-7xl">
      <ul className="w-full flex flex-wrap justify-center lg:justify-between gap-6">
        {data?.map((user: User) => (
          <li key={user.id}>
            <UserCard {...user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
