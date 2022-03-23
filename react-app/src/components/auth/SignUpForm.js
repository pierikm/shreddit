import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import { signupValidators } from './SignUpValidators';
import './signupform.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (!errors.length) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  useEffect(() => {
    signupValidators(username, email, password, repeatPassword, setErrors);
  }, [username, email, password, repeatPassword])

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='signup-form-container'>
        <form className='signup-form' onSubmit={onSignUp}>
          {
            showErrors &&
            <div className='signup-errors'>
              {errors.map((error, ind) => (
                <div id="error" key={ind}>{error}</div>
              ))}
            </div>
          }
          <label className='username-label'>Username</label>
          <input
            className='username-input'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
          <label className='signup-email-label'>Email</label>
          <input
            className='signup-email-input'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
          <label className='signup-pass-label'>Password</label>
          <input
            className='signup-pass-input'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
          <label className='signup-cpass-label'>Confirm Password</label>
          <input
            className='signup-cpass-input'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          <button
            className='button signup-btn'
            type='submit'>
            Sign Up
          </button>
        </form>
        <div className='login-link'>
          <span>Already a user? </span>
          <NavLink className="login-here" to="/login">Log in here.</NavLink>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
