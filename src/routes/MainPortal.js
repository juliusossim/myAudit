import React from 'react';
import { useLocation } from 'react-router-dom';
import portalRoutes from './portal.routes';
import RouteTemplate from './RouteTemplate';

const MainPortal = ({ pad }) => {
  const { pathname } = useLocation();
  const path = (route) => pathname.startsWith(route);

  return <RouteTemplate redirect={path('/app') ? '/app/dashboard' : '/home'} routes={portalRoutes} pad={pad} />;
};
export default MainPortal;
