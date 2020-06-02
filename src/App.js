import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {
  Dashboard,
} from 'containers';

import 'sass/animate.scss';
import 'sass/main.scss';
import 'sass/media.scss';
import 'sass/feather-icon.scss';

const App = () => (
  <main className="main">
    <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Redirect from="/" to="/dashboard" />
    </Switch>
  </main>
);

export default App;
