import React from 'react';
import homeRoutes from './home.routes';
import RouteTemplate from './RouteTemplate';

const HomePortal = () => <RouteTemplate routes={homeRoutes} redirect="/home" />;

export default HomePortal;
