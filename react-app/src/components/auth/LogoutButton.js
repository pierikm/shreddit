import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    // sessionStorage.removeItem('sortBy');
    await dispatch(logout());
  };

  return <button className='button navbar-btn navbar-logout' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
