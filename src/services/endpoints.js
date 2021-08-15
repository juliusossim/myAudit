import * as authEndpoints from './authService';
import * as fileUploads from './fileUploadService';
import * as projectEndpoints from './projectService';
import * as profileEndpoints from './profileService';

const servers = {
  auth: process.env.REACT_APP_AUTH_SERVER,
  project: process.env.REACT_APP_PROJECT_SERVER
};

const paths = {
  // auth
  LOGIN: `${servers.auth}${authEndpoints.loginApi}`,
  REGISTER: `${servers.auth}${authEndpoints.registerApi}`,
  REGISTER_CORPORATE: `${servers.auth}${authEndpoints.registerCorporateApi}`,
  VERIFY_INDIVIDUAL: `${servers.auth}${authEndpoints.verifyIndividualApi}`,
  VERIFY_CORPORATE: `${servers.auth}${authEndpoints.verifyCorporateApi}`,
  VERIFY_ACCOUNT_OTP: `${servers.auth}${authEndpoints.verifyAccountOtpApi}`,
  SEND_ACCOUNT_OTP: `${servers.auth}${authEndpoints.sendAccountOtpApi}`,
  REGISTER_INDIVIDUAL: `${servers.auth}${authEndpoints.registerIndividualApi}`,
  CHANGE_PASSWORD: `${servers.auth}${authEndpoints.changePasswordApi}`,
  RESET_PASSWORD: `${servers.auth}${authEndpoints.resetPassword}`,
  FORGOT_PASSWORD: `${servers.auth}${authEndpoints.forgotPasswordApi}`,
  // uploads
  DP: `${servers.project}${fileUploads.profilePic}`,
  PROJECT_MEDIA: `${servers.project}${fileUploads.project}`,
  DELETE_PROJECT_MEDIA: `${servers.project}${fileUploads.deleteProjectMedia}`,
  LOGO: `${servers.project}${fileUploads.logo}`,
  // projects
  CREATE_PROJECT_NAME: `${servers.project}${projectEndpoints.createProjectName}`,
  CREATE_PROJECT: `${servers.project}${projectEndpoints.createProject}`,
  GET_PROJECT: `${servers.project}${projectEndpoints.getProject}`,
  VIEW_PROJECTS: `${servers.project}${projectEndpoints.viewProjects}`,
  VIEW_PROJECT: `${servers.project}${projectEndpoints.viewProject}`,
  EDIT_PROJECT: `${servers.project}${projectEndpoints.editProject}`,
  DELETE_PROJECT: `${servers.project}${projectEndpoints.deleteProject}`,
  EDIT_PROJECT_UPDATES: `${servers.project}${projectEndpoints.editProjectUpdate}`,
  PROJECT_UPDATES: `${servers.project}${projectEndpoints.showProjectUpdate}`,
  UPDATE_PROJECT: `${servers.project}${projectEndpoints.updateProject}`,
  PROJECT_DETAILS: `${servers.project}${projectEndpoints.projectDetails}`,
  SIMILAR_PROJECTS: `${servers.project}${projectEndpoints.similarProjects}`,
  PROJECT_SUMMARY: `${servers.project}${projectEndpoints.projectSummary}`,
  PROJECT_BY_STATUS: `${servers.project}${projectEndpoints.projectByStatus()}`,
  SUBMIT_PROJECT: `${servers.project}${projectEndpoints.submitProject}`,
  PROJECT_CATEGORIES: `${servers.project}${projectEndpoints.projectCategories}`,
  STATE_LGAS: `${servers.project}${projectEndpoints.stateLgas}`,
  EDIT_PROJECT_REQUEST: `${servers.project}${projectEndpoints.editProjectRequest}`,
  POPULAR_FUNDRAISERS: `${servers.project}${projectEndpoints.popularFundraisers}`,
  POPULAR_NGOS: `${servers.project}${projectEndpoints.popularNGOs}`,

  // profile
  ME: `${servers.auth}${profileEndpoints.me}`,
  PERSONAL_ACCOUNTS: `${servers.auth}${profileEndpoints.personalAccounts}`,
  CORPORATE_MANAGERS: `${servers.auth}${profileEndpoints.corporateManagers}`,
  EDIT_PERSONAL_ACCOUNT: `${servers.auth}${profileEndpoints.editPersonalAccount}`,
  CHANGE_MANAGER: `${servers.auth}${profileEndpoints.changeManager}`,
  NOTIFICATIONS: `${servers.project}${profileEndpoints.notifications}`,
  MY_PROJECTS: `${servers.project}${projectEndpoints.myProjects}`,
  PROFILES: `${servers.auth}${profileEndpoints.getProfile}`
};

export default paths;
