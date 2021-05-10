import * as authEndpoints from './authService';

const paths = {
  LOGIN: authEndpoints.loginApi,
  REGISTER_CORPORATE: authEndpoints.registerCorporateApi,
  REGISTER_INDIVIDUAL: authEndpoints.registerIndividualApi,
  CHANGE_PASSWORD: authEndpoints.changePasswordApi,
  FORGOT_PASSWORD: authEndpoints.forgotPasswordApi
};

export default paths;
