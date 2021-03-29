import { lazy } from 'react';

const Login = lazy(() => import('../authentication/Login'));

const routes = [
  {
    path: '/',
    component: Login,
    exact: true
  }
];

export default routes;
