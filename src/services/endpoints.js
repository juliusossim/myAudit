import * as authEndpoints from './authService';
import * as fileUploads from './fileUploadService';
import * as projectEndpoints from './projectService';

const paths = {
  // auth
  LOGIN: authEndpoints.loginApi,
  REGISTER: authEndpoints.registerApi,
  REGISTER_CORPORATE: authEndpoints.registerCorporateApi,
  VERIFY_INDIVIDUAL: authEndpoints.verifyIndividualApi,
  VERIFY_CORPORATE: authEndpoints.verifyCorporateApi,
  REGISTER_INDIVIDUAL: authEndpoints.registerIndividualApi,
  CHANGE_PASSWORD: authEndpoints.changePasswordApi,
  RESET_PASSWORD: authEndpoints.resetPassword,
  FORGOT_PASSWORD: authEndpoints.forgotPasswordApi,
  // uploads
  PROFILE_PICTURE: fileUploads.profilePic,
  PROJECT_MEDIA: fileUploads.project,
  DELETE_PROJECT_MEDIA: fileUploads.deleteProjectMedia,
  LOGO: fileUploads.logo,
  // projects
  CREATE_PROJECT: projectEndpoints.createProject,
  VIEW_PROJECTS: projectEndpoints.viewProjects,
  VIEW_PROJECT: projectEndpoints.viewProject,
  EDIT_PROJECT: projectEndpoints.editProject,
  DELETE_PROJECT: projectEndpoints.deleteProject,
  EDIT_PROJECT_UPDATES: projectEndpoints.editProjectUpdate,
  PROJECT_UPDATES: projectEndpoints.showProjectUpdate,
  UPDATE_PROJECT: projectEndpoints.updateProject,
  PROJECT_DETAILS: projectEndpoints.projectDetails,
  PROJECT_SUMMARY: projectEndpoints.projectSummary

};

export default paths;
