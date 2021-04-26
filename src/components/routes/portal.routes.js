import { lazy } from 'react';

const Login = lazy(() => import('../authentication/Login'));
const Register = lazy(() => import('../authentication/Register'));
const LandingPage = lazy(() => import('../landingPage/index'));

const routes = [
  {
    path: '/',
    component: Login,
    exact: true
  },

  {
    path: '/register',
    component: Register,
    exact: true
  },

  {
    path: '/home',
    component: LandingPage,
    exact: true
  }

];

export default routes;
