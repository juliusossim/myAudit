import * as authEndpoints from './authService';
import * as fileUploads from './fileUploadService';
import * as projectEndpoints from './projectService';
import * as profileEndpoints from './profileService';
import * as paymentEndpoints from './paymentService';

const paths = {
  // auth
  LOGIN: authEndpoints.loginApi,
  LOGOUT: authEndpoints.logoutApi,
  INVITE_USER: authEndpoints.inviteUser,
  REGISTER_INVITED_USER: authEndpoints.registerInvitedUserApi,
  REGISTER: authEndpoints.registerApi,
  CHANGE_PASSWORD: authEndpoints.changePasswordApi,
  RESET_PASSWORD: authEndpoints.resetPassword,
  FORGOT_PASSWORD: authEndpoints.forgotPasswordApi,
  // uploads
  DP: fileUploads.profilePic,
  PROJECT_MEDIA: fileUploads.project,
  DELETE_PROJECT_MEDIA: fileUploads.deleteProjectMedia,
  LOGO: fileUploads.logo,
  // projects
  CREATE_PROJECT_NAME: projectEndpoints.createProjectName,
  CREATE_PROJECT: projectEndpoints.createProject,
  GET_PROJECT: projectEndpoints.getProject,
  VIEW_PROJECTS: projectEndpoints.viewProjects,
  VIEW_PROJECT: projectEndpoints.viewProject,
  EDIT_PROJECT: projectEndpoints.editProject,
  DELETE_PROJECT: projectEndpoints.deleteProject,
  EDIT_PROJECT_UPDATES: projectEndpoints.editProjectUpdate,
  PROJECT_UPDATES: projectEndpoints.showProjectUpdate,
  UPDATE_PROJECT: projectEndpoints.updateProject,
  PROJECT_DETAILS: projectEndpoints.projectDetails,
  SIMILAR_PROJECTS: projectEndpoints.similarProjects,
  PROJECT_SUMMARY: projectEndpoints.projectSummary,
  PROJECT_BY_STATUS: projectEndpoints.projectByStatus,
  SUBMIT_PROJECT: projectEndpoints.submitProject,
  PROJECT_CATEGORIES: projectEndpoints.projectCategories,
  STATE_LGAS: projectEndpoints.stateLgas,
  EDIT_PROJECT_REQUEST: projectEndpoints.editProjectRequest,
  POPULAR_FUNDRAISERS: projectEndpoints.popularFundraisers,
  POPULAR_PROJECTS: projectEndpoints.popularProjects,
  POPULAR_NGOS: projectEndpoints.popularNGOs,
  SEARCH_PROJECTS: projectEndpoints.searchProject,
  POST_COMMENT: projectEndpoints.postComment,
  PROJECT_COMMENTS: projectEndpoints.projectComments,
  GET_COMMENT: projectEndpoints.getComment,
  PATCH_COMMENT: projectEndpoints.patchComment,
  DETAILS_SIMILAR: projectEndpoints.detailsSimilar,
  COMMENTS_DONORS: projectEndpoints.commentsDonors,

  // payment
  STOP_PROJECT: paymentEndpoints.stopProject,
  PROJECT_DONORS: paymentEndpoints.projectDonors,
  PROJECT_DONATE: paymentEndpoints.projectDonate,
  PAYMENT_INITIATE: paymentEndpoints.projectInitiate,
  PAYMENT_COMPLETE: paymentEndpoints.paymentsComplete,
  USER_TRANSACTIONS: paymentEndpoints.userTransactions,

  // profile
  ME: profileEndpoints.me,
  PERSONAL_ACCOUNTS: profileEndpoints.personalAccounts,
  CORPORATE_MANAGERS: profileEndpoints.corporateManagers,
  EDIT_PERSONAL_ACCOUNT: profileEndpoints.editPersonalAccount,
  CHANGE_MANAGER: profileEndpoints.changeManager,
  NOTIFICATIONS: profileEndpoints.notifications,
  MY_PROJECTS: projectEndpoints.myProjects,
  PROFILES: profileEndpoints.getProfile,

  // index
  INDEX: projectEndpoints.index
};

export default paths;
