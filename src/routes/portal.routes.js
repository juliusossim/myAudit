import { lazy } from 'react';

const Login = lazy(() => import('../pages/authentication/Login'));
const Register = lazy(() => import('../pages/authentication/Register'));
const CompleteProfile1 = lazy(() => import('../pages/authentication/CompleteProfile-1'));
const NewEngagement = lazy(() => import('../pages/Engagements/NewEngagement'));
const LandingPage = lazy(() => import('../pages/landingPage'));
/* dashboard */
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const CompleteRegistration = lazy(() => import('../pages/authentication/CompleteProfile'));
const CompleteProfile = lazy(() => import('../pages/authentication/CompleteProfile-1'));

const ChangePassword = lazy(() => import('../pages/authentication/ChangePassword'));
const ResetPassword = lazy(() => import('../pages/authentication/ResetPassword'));
const ForgotPassword = lazy(() => import('../pages/authentication/ForgotPassword'));
const NewPassword = lazy(() => import('../pages/authentication/NewPassword'));
const CreateProject = lazy(() => import('../pages/project/CreateProject'));
const Init = lazy(() => import('../pages/project/Init'));
const Project1 = lazy(() => import('../pages/project/Project1'));
const Project2 = lazy(() => import('../pages/project/Project2'));
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
    path: '/new-engagement',
    component: NewEngagement,
    exact: true
  },
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true
  },
  {
    path: '/complete-registration',
    component: CompleteRegistration,
    exact: true
  },
  {
    path: '/complete-profile',
    component: CompleteProfile,
    exact: true
  },

  // {
  //   path: '/dashboard/:param',
  //   component: Dashboard,
  //   exact: true
  // },
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
    path: '/complete-profile',
    component: CompleteProfile1,
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
    path: '/project/init',
    component: Init,
    exact: true
  },
  {
    path: '/review/project/:id',
    component: Project3,
    exact: true
  },
  {
    path: '/project/create/form-1/:id/:projectTitle',
    component: Project1,
    exact: true
  },
  {
    path: '/project/create/form-2/:id',
    component: Project2,
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
