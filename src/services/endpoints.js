import * as authEndpoints from './authService';
import * as fileUploads from './fileUploadService';
import * as projectEndpoints from './projectService';

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
  PROFILE_PICTURE: fileUploads.profilePic,
  PROJECT_MEDIA: fileUploads.project,
  DELETE_PROJECT_MEDIA: fileUploads.deleteProjectMedia,
  LOGO: fileUploads.logo,
  // projects
  CREATE_PROJECT: `${servers.project}${projectEndpoints.createProject}`,
  VIEW_PROJECTS: `${servers.project}${projectEndpoints.viewProjects}`,
  VIEW_PROJECT: `${servers.project}${projectEndpoints.viewProject}`,
  EDIT_PROJECT: `${servers.project}${projectEndpoints.editProject}`,
  DELETE_PROJECT: `${servers.project}${projectEndpoints.deleteProject}`,
  EDIT_PROJECT_UPDATES: `${servers.project}${projectEndpoints.editProjectUpdate}`,
  PROJECT_UPDATES: `${servers.project}${projectEndpoints.showProjectUpdate}`,
  UPDATE_PROJECT: `${servers.project}${projectEndpoints.updateProject}`,
  PROJECT_DETAILS: `${servers.project}${projectEndpoints.projectDetails}`,
  PROJECT_SUMMARY: `${servers.project}${projectEndpoints.projectSummary}`

};

export default paths;
