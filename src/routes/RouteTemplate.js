import React, { Suspense } from 'react';
import {
  Route, Switch, Redirect
} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import MiniDrawer from '../components/ui/swipeableDrawer';
import User from '../assets/images/User.svg';
import { user } from '../utilities/auth';
import miniMenu from './menu';

const RouteTemplate = ({ redirect, routes, pad }) => {
  const profilePicTemp = (
    <div>
      <div className="dp-app">
        <Avatar
          className=""
          src={user?.profile_pic_url
         || User}
        />
      </div>
    </div>
  );
  const theRoutes = routes.map((route) => (route.component ? (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  ) : null));
  return (
    <MiniDrawer
      app={(
        <main className="min-h-100 p-t-40">
          <Suspense
            fallback={(
              <div className="loader-container loader-container2">
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
      )}
      menu={miniMenu}
      dp={profilePicTemp}
    />
  );
};

export default RouteTemplate;
