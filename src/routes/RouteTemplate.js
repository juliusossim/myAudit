import React, { Suspense, useEffect } from 'react';
import {
  Route, Switch, Redirect, useLocation
} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router';
import MiniDrawer from '../components/ui/swipeableDrawer';
import User from '../assets/images/User.svg';
import { user } from '../utilities/auth';
import miniMenu from './menu';

const RouteTemplate = ({ redirect, routes, pad }) => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  useEffect(() => user?.is_verified < 1 && push('/app/complete-registration'));

  const path = (route) => pathname.startsWith(route);
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
    <div>
      {
        path('/app')
          ? (
            <MiniDrawer
              app={(
                <main className="min-h-100">
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
          )
          : (
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
          )
      }
    </div>
  );
};

export default RouteTemplate;
