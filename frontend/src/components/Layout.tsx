import { Link, Outlet, useLocation } from 'react-router';
import { Plus } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { USERS_PER_PAGE } from '@/utils/constants';

const Layout = () => {
  const location = useLocation();

  const isOnUserList = location.pathname === '/users';
  const isOnCreateUser = location.pathname === '/create';

  return (
    <div className="flex flex-col min-h-screen">
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
              <Link
                to="/create"
                className="flex sm:min-w-[185px] gap-2 px-4 py-2 bg-currentColor border-[1px] border-slate-300 text-slate-200 hover:text-white font-medium rounded-lg hover:bg-slate-500 transition-colors"
              >
                <Plus />
                <span className="hidden sm:inline"> Add New User</span>
              </Link>
            )}
            {isOnCreateUser && (
              <Link
                to="/users"
                className="flex sm:min-w-[185px] gap-2 px-4 py-2 bg-currentColor border-[1px] border-slate-300 text-slate-200 hover:text-white font-medium rounded-lg hover:bg-slate-500 transition-colors"
              >
                <ArrowLeft />
                <span className="hidden sm:inline"> Back to Userlist</span>
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow p-4 bg-slate-200">
        <Outlet />
      </main>
      <footer className="bg-slate-200 text-slate-500 text-sm p-4 border-t-[1px] border-slate-300">
        <div className="flex max-w-7xl mx-auto justify-center items-center">
          <p>&copy; 2025 UserBase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
