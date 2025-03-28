import { useGetUsersQuery } from '@/api/userApi';
import { User } from '@/types/user';

const UserList = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  console.log('data=', data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users!</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data?.map((user: User) => (
          <li key={user.id}>
            <div>{`${user.firstName} ${user.lastName}`}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
