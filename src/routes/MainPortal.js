import React from 'react';
import portalRoutes from './portal.routes';
import RouteTemplate from './RouteTemplate';

const MainPortal = ({ pad }) => <RouteTemplate redirect="/home" routes={portalRoutes} pad={pad} />;
export default MainPortal;
