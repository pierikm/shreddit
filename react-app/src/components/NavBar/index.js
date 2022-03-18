import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css';

const NavBar = () => {
  const session = useSelector(state => state.session);


  return (
    <nav className='navbar'>
      <div>
        <NavLink to='/posts' exact={true} activeClassName='active'>
          Shreddit
        </NavLink>
      </div>
      {!session.user &&
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
      }
      {/* {session.user &&
        <div>
          <NavLink to='/posts' exact={true} activeClassName='active'>
            Posts
          </NavLink>
        </div>
      } */}
      {session.user &&
        <div>
          <LogoutButton />
        </div>
      }
    </nav>
  );
}

export default NavBar;
