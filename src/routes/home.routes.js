import { lazy } from 'react';

const LandingPage = lazy(() => import('../pages/landingPage'));

const routes = [
  {
    path: '/home',
    component: LandingPage,
    exact: true
  }

];

export default routes;
