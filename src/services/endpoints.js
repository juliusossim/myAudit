import * as authEndpoints from './authService';
import * as fileUploads from './fileUploadService';
import * as engagementEnpoints from './engagementService';
import * as profileEndpoints from './profileService';
import * as paymentEndpoints from './paymentService';

const paths = {
  // auth
  LOGIN: authEndpoints.loginApi,
  LOGOUT: authEndpoints.logoutApi,
  INVITE_USER: authEndpoints.inviteUser,
  REGISTER_INVITED_USER: authEndpoints.registerInvitedUserApi,
  REGISTER: authEndpoints.registerApi,
  COMPLETE_REGISTRATION: authEndpoints.completeRgistrationApi,
  CHANGE_PASSWORD: authEndpoints.changePasswordApi,
  RESET_PASSWORD: authEndpoints.resetPassword,
  FORGOT_PASSWORD: authEndpoints.forgotPasswordApi,

  // clients
  CREATE_CLIENT: engagementEnpoints.clients,
  DELETE_CLIENT: engagementEnpoints.clients,
  EDIT_CLIENT: engagementEnpoints.clients,
  CLIENTS: engagementEnpoints.clients,
  // uploads
  DP: fileUploads.profilePic,
  PROJECT_MEDIA: fileUploads.upload,
  DELETE_PROJECT_MEDIA: fileUploads.deleteProjectMedia,
  LOGO: fileUploads.logo,
  // engagements
  CREATE_ENGAGEMENT: engagementEnpoints.engagements,
  ENGAGEMENT: engagementEnpoints.engagements,
  MATERIALITY: engagementEnpoints.materiality,
  TESTS: engagementEnpoints.tests,
  DASHBOARD: engagementEnpoints.dashboard,
  ENGAGEMENTS: engagementEnpoints.engagements,
  EDIT_ENGAGEMENT: engagementEnpoints.engagements,
  DELETE_ENGAGEMENT: engagementEnpoints.engagements,

  // payment
  STOP_PROJECT: paymentEndpoints.stopProject,
  PROJECT_DONORS: paymentEndpoints.projectDonors,
  PROJECT_DONATE: paymentEndpoints.projectDonate,
  PAYMENT_INITIATE: paymentEndpoints.projectInitiate,
  PAYMENT_COMPLETE: paymentEndpoints.paymentsComplete,
  USER_TRANSACTIONS: paymentEndpoints.userTransactions,

  // users
  USERS: profileEndpoints.users,
  INVITATIONS: profileEndpoints.invitations,

  // profile
  ME: profileEndpoints.me,
  PERSONAL_ACCOUNTS: profileEndpoints.personalAccounts,
  CORPORATE_MANAGERS: profileEndpoints.corporateManagers,
  EDIT_PERSONAL_ACCOUNT: profileEndpoints.editPersonalAccount,
  CHANGE_MANAGER: profileEndpoints.changeManager,
  NOTIFICATIONS: profileEndpoints.notifications,
  MY_PROJECTS: engagementEnpoints.myEngagements,
  PROFILES: profileEndpoints.getProfile,

  // index
  INDEX: authEndpoints.index
};

export default paths;
