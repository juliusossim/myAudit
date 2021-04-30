import * as authEndpoints from './authService';

const paths = {
  LOGIN: authEndpoints.loginApi,
  REGISTER_CORPORATE: authEndpoints.registerCorporateApi,
  REGISTER_INDIVIDUAL: authEndpoints.registerIndividualApi
};

export default paths;
