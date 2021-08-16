import { lazy } from 'react';

const LandingPage = lazy(() => import('../pages/landingPage/index'));
const Explore = lazy(() => import('../pages/landingPage/Explore'));

const routes = [
  {
    path: '/home',
    component: LandingPage,
    exact: true
  },
  {
    path: '/explore',
    component: Explore,
    exact: true
  }

];

export default routes;
