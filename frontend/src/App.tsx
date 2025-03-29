import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import UserListPage from './pages/UserListPage';
import CreateUser from './pages/CreateUser';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route element={<Layout />}>
          <Route path="/users" element={<UserListPage />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
