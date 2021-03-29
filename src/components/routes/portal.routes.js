import { lazy } from 'react';

const Login = lazy(() => import('../authentication/Login'));
const LoanForm = lazy(() => import('../LoanForm'));
const ApplicationList = lazy(() => import('../ApplicationList'));

const loansRoutes = [
  {
    path: '/',
    component: Login,
    exact: true
  },
  {
    path: '/portal',
    component: ApplicationList,
    exact: true
  },
  {
    path: '/portal/loan-application',
    component: LoanForm,
    exact: true
  }
];

export default loansRoutes;
