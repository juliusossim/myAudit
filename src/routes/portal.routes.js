import { lazy } from 'react';

const Login = lazy(() => import('../pages/authentication/Login'));
const Register = lazy(() => import('../pages/authentication/registration/Register'));
const LandingPage = lazy(() => import('../pages/landingPage'));
const ChangePassword = lazy(() => import('../pages/authentication/ChangePassword'));
const ForgotPassword = lazy(() => import('../pages/authentication/ForgotPassword'));
const NewPassword = lazy(() => import('../pages/authentication/NewPassword'));
const CreateProject = lazy(() => import('../pages/project/CreateProject'));

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
  },
  {
    path: '/create-project',
    component: CreateProject,
    exact: true
  }
];

export default routes;
