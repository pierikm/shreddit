import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginform.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async () => {
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/posts' />;
  }

  return (
    <>
      <div className='login-form-container'>
        <form
          className='login-form'
          onSubmit={onLogin}>
          <div className='login-errors'>
            {errors.map((error, ind) => (
              <div className='login-error' key={ind}>{error}</div>
            ))}
          </div>
          <label className='login-email-label' htmlFor='email'>Email:</label>
          <input
            className='login-email-input'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <label className='login-password-label' htmlFor='password'>Password:</label>
          <input
            className='login-password-input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button className='login-btn button' type='submit'>Login</button>
        </form>
        <button
          className='button demo-btn'
          onClick={demoLogin}
        >
          Login as Demo User
        </button>
        <div className='sign-up-link'>
          <span>Don't have an account? </span>
          <NavLink className="sign-up-here" to="/sign-up">Sign up here</NavLink>
          <span> or...</span>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
