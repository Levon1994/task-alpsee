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
  <main className="layout-w">
    <div className="content-w">
      <div className="content-i">
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Redirect from="/" to="/dashboard" />
        </Switch>
      </div>
    </div>
  </main>
);

export default App;
