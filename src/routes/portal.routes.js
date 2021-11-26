import { lazy } from 'react';

const Login = lazy(() => import('../pages/authentication/Login'));
const Register = lazy(() => import('../pages/authentication/Register'));
const CompleteProfile1 = lazy(() => import('../pages/authentication/CompleteProfile-1'));
const LandingPage = lazy(() => import('../pages/landingPage'));
/* dashboard */
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const CompleteRegistration = lazy(() => import('../pages/authentication/CompleteProfile'));
const CompleteProfile = lazy(() => import('../pages/authentication/CompleteProfile-1'));

/* engagement */
const Engagement = lazy(() => import('../pages/Engagements/EngagementIndex'));
const NewEngagement = lazy(() => import('../pages/Engagements/NewEngagement'));
const EngagementView = lazy(() => import('../pages/Engagements/Engagement'));
const PrePlanning = lazy(() => import('../pages/Engagements/PrePlanning'));
const Planning = lazy(() => import('../pages/Engagements/Planning'));

/* clients */
const Client = lazy(() => import('../pages/Clients/ClientsIndex'));
const NewClient = lazy(() => import('../pages/Clients/NewClients'));

/* team */
const TeamIndex = lazy(() => import('../pages/Team/TeamIndex'));
const InviteUser = lazy(() => import('../pages/Team/InviteUser'));
// const AcceptInvite = lazy(() => import('../pages/Team/InviteUser'));
const InvitedUser = lazy(() => import('../pages/Team/RegisterInvitedUser'));

/* no data */
const NoData = lazy(() => import('../pages/authentication/NoData'));

const ChangePassword = lazy(() => import('../pages/authentication/ChangePassword'));
const ResetPassword = lazy(() => import('../pages/authentication/ResetPassword'));
const ForgotPassword = lazy(() => import('../pages/authentication/ForgotPassword'));
const NewPassword = lazy(() => import('../pages/authentication/NewPassword'));
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
  /* working */
  {
    path: '/app/engagement/new-engagement',
    component: NewEngagement,
    exact: true,
    name: 'engagement'
  },
  {
    path: '/app/engagement/engagement/:engagementId',
    component: EngagementView,
    exact: true,
    name: 'engagement'
  },
  {
    path: '/app/engagement/new-engagement',
    component: NewEngagement,
    exact: true,
    name: 'engagement'
  },
  {
    path: '/app/engagement/pre-planning/:engagementName/:engagementId',
    component: PrePlanning,
    exact: true,
    name: 'engagement'
  },
  {
    path: '/app/engagement/planning/:engagementName/:engagementId',
    component: Planning,
    exact: true,
    name: 'engagement'
  },
  {
    path: '/app/no-data/:name',
    component: NoData,
    exact: true,
    name: 'engagement'
  },
  {
    path: '/app/engagement',
    component: Engagement,
    exact: true,
    name: 'engagement'
  },
  {
    path: '/app/dashboard',
    component: Dashboard,
    exact: true
  },
  {
    path: '/app/dashboard/complete-registration',
    component: CompleteRegistration,
    exact: true,
    name: 'dashboard'
  },
  {
    path: '/app/dashboard/complete-profile',
    component: CompleteProfile,
    exact: true,
    name: 'dashboard'
  },

  {
    path: '/app/clients',
    component: Client,
    exact: true,
    name: 'clients'
  },

  {
    path: '/app/clients/new-client',
    component: NewClient,
    exact: true,
    name: 'clients'
  },
  {
    path: '/app/team',
    component: TeamIndex,
    exact: true
  },
  {
    path: '/app/team/invite-user',
    component: InviteUser,
    exact: true
  },
  {
    path: '/invited-user-registration/:token',
    component: InvitedUser,
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
    path: '/unauthorized',
    component: Unauthorized,
    exact: true
  }
];

export default routes;
