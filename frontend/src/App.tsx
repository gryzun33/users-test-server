import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import UserList from './pages/UserList';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route element={<Layout />}>
          <Route path="/users" element={<UserList />} />
          <Route path="/create" element={<CreateUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
