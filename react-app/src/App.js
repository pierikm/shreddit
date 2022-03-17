import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import User from './components/User';
import Posts from './components/Posts';
import Post from './components/Post';
import { authenticate } from './store/session';
import { loadPosts } from './store/posts';
import NewPostForm from './components/Posts/NewPostForm';
// import EditPostForm from './components/Posts/EditPostForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(loadPosts());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/login'>
          <LoginForm />
        </Route>
        <Route exact path='/sign-up'>
          <SignUpForm />
        </Route>
        <ProtectedRoute exact path='/users' >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute exact path='/users/:userId' >
          <User />
        </ProtectedRoute>
        <ProtectedRoute exact path='/' >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute exact path='/posts'>
          <Posts />
        </ProtectedRoute>
        <ProtectedRoute exact path='/posts/new'>
          <NewPostForm />
        </ProtectedRoute>
        <ProtectedRoute exact path='/posts/:postId'>
          <Post />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
