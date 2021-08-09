import { lazy } from 'react';

const Login = lazy(() => import('../pages/authentication/Login'));
const Register = lazy(() => import('../pages/authentication/Register'));
const LandingPage = lazy(() => import('../pages/landingPage'));
const ChangePassword = lazy(() => import('../pages/authentication/ChangePassword'));
const ResetPassword = lazy(() => import('../pages/authentication/ResetPassword'));
const ForgotPassword = lazy(() => import('../pages/authentication/ForgotPassword'));
const NewPassword = lazy(() => import('../pages/authentication/NewPassword'));
const CreateProject = lazy(() => import('../pages/project/CreateProject'));
const Unauthorized = lazy(() => import('../pages/authentication/Unauthorized'));
const Profile = lazy(() => import('../pages/profile/Index'));
const ProjectDetails = lazy(() => import('../pages/project/details/ProjectDetails'));

const routes = [
  {
    path: '/home',
    component: LandingPage,
    exact: true
  },

  {
    path: '/me',
    component: Profile,
    exact: true
  },

  {
    path: '/login',
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
    path: '/reset-password',
    component: ResetPassword,
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
    path: '/create-project/:id/:tab',
    component: CreateProject,
    exact: true
  },
  {
    path: '/project/details/:id/:tab',
    component: ProjectDetails,
    exact: true
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
    exact: true
  }
];

export default routes;
