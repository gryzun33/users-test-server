import { useGetUsersQuery } from '@/api/userApi';
import UserCard from '@/features/UserCard';
import { User } from '@/types/user';

const UserList = () => {
  const {
    data: { users = [], totalPages } = {},
    error,
    isLoading,
  } = useGetUsersQuery({ page: 1, limit: 12 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users!</div>;
  }
  console.log('users=', users);
  console.log('totalpages=', totalPages);
  return (
    <div className="mx-auto max-w-7xl">
      <ul className="w-full flex flex-wrap justify-center lg:justify-between gap-6">
        {users.map((user: User) => (
          <li key={user.id}>
            <UserCard {...user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
