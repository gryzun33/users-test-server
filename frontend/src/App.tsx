import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout/Layout';
import UserListPage from './pages/UserListPage';
import CreateUserPage from './pages/CreateUserPage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route element={<Layout />}>
          <Route path="/users" element={<UserListPage />} />
          <Route path="/create" element={<CreateUserPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
