import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {
  Dashboard,
} from 'containers';

import 'sass/main.scss';

const App = () => (
  <main className="main">
    <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Redirect from="/" to="/dashboard" />
    </Switch>
  </main>
);

export default App;
