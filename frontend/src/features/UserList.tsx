import { User } from '@/types/user';
import UserCard from './UserCard';
import { memo } from 'react';

const UserList = memo(({ users }: { users: User[] }) => {
  console.log('users=', users);
  return (
    <ul className="self-center xl:w-full inline-grid grid-cols-auto xl:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-6 pb-5">
      {users.map((user: User) => (
        <li key={user.id}>
          <UserCard {...user} />
        </li>
      ))}
    </ul>
  );
});

export default UserList;
