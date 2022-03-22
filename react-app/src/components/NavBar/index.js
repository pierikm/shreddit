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
        <NavLink to='/posts' exact={true} activeClassName='active' className='shreddit-logo-container'>
          <span>
            <i
              className="fa-solid fa-person-snowboarding fa-3x"
              id="snowboard-logo"></i>
          </span>
          <span id="shreddit">Shreddit</span>
        </NavLink>
      </div>
      {!session.user &&
        <div className='nav-log-sign-btn-container'>
          <NavLink className="button navbar-btn navbar-login" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink className="button navbar-btn navbar-signup" to='/sign-up' exact={true} activeClassName='active'>
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
