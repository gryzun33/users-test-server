import { Outlet } from 'react-router';

import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 bg-slate-200 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
