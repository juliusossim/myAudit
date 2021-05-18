import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import MainPortal from './routes/MainPortal';

function App() {
  const history = createBrowserHistory();

  return (
    <Suspense fallback={(
      <div className="loader">
        <i />
      </div>
    )}
    >
      <Router history={history}>
        <Switch>

          <Route path="/" component={MainPortal} />

          <Route render={() => <h1>Error 404. Page not found.</h1>} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
