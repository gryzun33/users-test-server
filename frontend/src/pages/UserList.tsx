import { useGetUsersQuery } from '@/api/userApi';
import DynamicPagination from '@/features/DynamicPagination';
import UserCard from '@/features/UserCard';
import { User } from '@/types/user';

const UserList = () => {
  const {
    data: { users = [], totalPages = 1 } = {},
    error,
    isLoading,
  } = useGetUsersQuery({ page: 1, limit: 100 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users!</div>;
  }
  console.log('users=', users);
  console.log('totalpages=', totalPages);
  return (
    <div className="mx-auto xl:max-w-7xl flex flex-col">
      <ul className="self-center inline-grid grid-cols-auto xl:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-6 pb-5">
        {users.map((user: User) => (
          <li key={user.id}>
            <UserCard {...user} />
          </li>
        ))}
      </ul>
      <DynamicPagination totalPages={totalPages} />
    </div>
  );
};

export default UserList;
