import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Topic from './components/Topic';
import Create from './components/Create';
import Edit from './components/Edit';

import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/' exact={true}>
          <Home />
        </Route>

        <Route path='/create' exact={true}>
          <Create />
        </Route>
        <Route path='/topics/:topicId/edit' exact={true}>
          <Edit />
        </Route>

        <Route path='/topics/:topicId' exact={true}>
          <Topic />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
