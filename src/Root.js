import React from 'react';
import App from './App';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

/**
 *
 * @return {*}
 * @constructor
 */
export default function Root() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/App">
          <App />
        </Route>
      </Switch>
    </Router>
  );
}
