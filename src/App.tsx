import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UsersProvider } from './context/UsersProvider';
import { Layout } from './components/Layout';
import { UsersListPage } from './pages/UsersListPage';
import { AddUserPage } from './pages/AddUserPage';

function App() {
  return (
    <UsersProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<UsersListPage />} />
            <Route path="add" element={<AddUserPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </UsersProvider>
  );
}

export default App
