import { Link, useLocation } from 'react-router';
import { Plus } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { USERS_PER_PAGE } from '@/utils/constants';
import NavigationLink from './NavigationLink';

const Header = () => {
  const location = useLocation();

  const isOnUserList = location.pathname === '/users';
  const isOnCreateUser = location.pathname === '/create';

  return (
    <header className="bg-slate-700 w-full p-4 ">
      <div className="flex max-w-7xl mx-auto justify-between items-center">
        <Link
          to={`/users?page=1&limit=${USERS_PER_PAGE}`}
          className="text-2xl font-bold text-red-400"
        >
          UserBase
        </Link>
        <nav>
          {isOnUserList && (
            <NavigationLink Icon={Plus} text="Add New User" path="/create" />
          )}
          {isOnCreateUser && (
            <NavigationLink
              Icon={ArrowLeft}
              text="Back to Userlist"
              path="/users"
            />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
