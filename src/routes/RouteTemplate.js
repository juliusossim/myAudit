import React, { Suspense } from 'react';
import {
  Route, Switch, Redirect
} from 'react-router-dom';

const RouteTemplate = ({ redirect, routes }) => {
  const theRoutes = routes.map((route) => (route.component ? (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  ) : null));
  return (
    <main className="min-h-100">
      <Suspense
        fallback={(
          <div className="loader-container">
            <div className="loader">
              <i />
            </div>
          </div>
        )}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={
              () => <Redirect to={redirect} />
            }
          />

          {theRoutes}
        </Switch>
      </Suspense>
    </main>
  );
};

export default RouteTemplate;
