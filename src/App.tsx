import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPage from './pages/ResetPage';
import ProfilePage from './pages/ProfilePage';

import Providers from './Providers';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
  useEffect(() => {
    // @HACK for mobile 100vh problem
    const fixMobileHeight = () => {
      const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
      };
      window.addEventListener('resize', appHeight);
      appHeight();
    };

    fixMobileHeight();
  }, []);

  return (
    <Providers>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/reset" component={ResetPage} />
        </Switch>
      </Router>
    </Providers>
  );
};

export default App;
