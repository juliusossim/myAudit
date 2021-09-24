import { lazy } from 'react';

const Login = lazy(() => import('../pages/authentication/Login'));
const Register = lazy(() => import('../pages/authentication/Register'));
const LandingPage = lazy(() => import('../pages/landingPage'));
const Explore = lazy(() => import('../pages/landingPage/Explore'));
const ChangePassword = lazy(() => import('../pages/authentication/ChangePassword'));
const ResetPassword = lazy(() => import('../pages/authentication/ResetPassword'));
const ForgotPassword = lazy(() => import('../pages/authentication/ForgotPassword'));
const NewPassword = lazy(() => import('../pages/authentication/NewPassword'));
const CreateProject = lazy(() => import('../pages/project/CreateProject'));
const Project3 = lazy(() => import('../pages/project/Project3'));
const Success = lazy(() => import('../pages/project/Success'));
const Unauthorized = lazy(() => import('../pages/authentication/Unauthorized'));
const Notifications = lazy(() => import('../pages/profile/Notifications'));
const Profile = lazy(() => import('../pages/profile/Index'));
const ProjectDetails = lazy(() => import('../pages/project/details/ProjectDetails'));
const Donate = lazy(() => import('../pages/project/details/Donate'));
const About = lazy(() => import('../pages/landingPage/About'));
const HowItWorks = lazy(() => import('../pages/landingPage/HowItWorks'));
const Terms = lazy(() => import('../pages/landingPage/Terms'));
const Privacy = lazy(() => import('../pages/landingPage/Privacy'));

const routes = [
  {
    path: '/home',
    component: LandingPage,
    exact: true
  },
  {
    path: '/about',
    component: About,
    exact: true
  },
  {
    path: '/privacy',
    component: Privacy,
    exact: true
  },
  {
    path: '/terms',
    component: Terms,
    exact: true
  },
  {
    path: '/how',
    component: HowItWorks,
    exact: true
  },
  {
    path: '/explore',
    component: Explore,
    exact: true
  },
  {
    path: '/explore/:param',
    component: Explore,
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
    path: '/create-project',
    component: CreateProject,
    exact: true
  },
  {
    path: '/review/project/:id',
    component: Project3,
    exact: true
  },
  {
    path: '/success',
    component: Success,
    exact: true
  },
  {
    path: '/notifications',
    component: Notifications,
    exact: true
  },
  {
    path: '/project/details/:id/:tab',
    component: ProjectDetails,
    exact: true
  },
  {
    path: '/project/donate/:id',
    component: Donate,
    exact: true
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
    exact: true
  }
];

export default routes;
