import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Reset from './pages/Reset';
import AppTemplate from './templates/AppTemplate';
import SetupTemplate from './templates/SetupTemplate';
import PrivateRoute from './components/PrivateRoute';

const fixMobileHeight = () => {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();
};

const App = () => {
  fixMobileHeight();
  return (
    <SetupTemplate>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={AppTemplate} />
        </Switch>
        <Switch>
          <Route path="/signin" component={Signin} />
        </Switch>
        <Switch>
          <Route path="/signup" component={Signup} />
        </Switch>
        <Switch>
          <Route path="/reset" component={Reset} />
        </Switch>
      </Router>
    </SetupTemplate>
  );
};

export default App;
