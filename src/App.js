import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Reset from './pages/Reset';
import SetupTemplate from './templates/SetupTemplate';

function App() {
  return (
    <SetupTemplate>
      <Router>
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
}

export default App;
