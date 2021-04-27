import { lazy } from 'react';

const Login = lazy(() => import('../authentication/Login'));
const Register = lazy(() => import('../authentication/Register'));
const LandingPage = lazy(() => import('../landingPage/index'));
const ChangePassword = lazy(() => import('../authentication/ChangePassword'));
const ForgotPassword = lazy(() => import('../authentication/ForgotPassword'));
const NewPassword = lazy(() => import('../authentication/NewPassword'));

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
  },

  {
    path: '/change-password',
    component: ChangePassword,
    exact: true
  },

  {
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true
  },

  {
    path: '/new-password',
    component: NewPassword,
    exact: true
  }
];

export default routes;
