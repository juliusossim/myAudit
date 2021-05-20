import React from 'react';
import portalRoutes from './portal.routes';
import RouteTemplate from './RouteTemplate';

const MainPortal = () => <RouteTemplate redirect="/home" routes={portalRoutes} />;
export default MainPortal;
