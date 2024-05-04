import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch } from './app/hooks';
import authService from './appwrite/auth';
import { login, logout } from './features/auth/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  });

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (null);
}

export default App;