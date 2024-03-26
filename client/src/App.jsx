import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile';
import { store } from './store';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from './../slices/userSlice';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Admindashboard from './pages/Admindashboard';
import { useDispatch } from 'react-redux';
import { autoLogin } from '../slices/userSlice';
import { useEffect } from 'react';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAdmin = user && user.userRole === 'admin';
  const defaultPage = isAdmin ? '/admindashboard' : '/';
  const location = useLocation();


  const showNavbar = location.pathname !== '/admindashboard';
  useEffect(() => {
    autoLogin();
  }, []);
  return (
    <Provider store={store}>
      {showNavbar && <Navbar />}
      <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {user ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/Contact-us" element={<Contact />} />
            <Route path="/Events" element={<Events />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/login" />} />
            <Route path="/profile" element={<Navigate to="/login" />} />
            <Route path="/Contact-us" element={<Navigate to="/login" />} />
            <Route path="/Events" element={<Navigate to="/login" />} />
          </>
        )}
        {isAdmin && (
          <>
            <Route path="/admindashboard" element={<Admindashboard />} />
          </>
        )}
      </Routes>
    </Provider>
  );
}

export default App;
