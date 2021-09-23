import constants from '../constants';

const initialState = {
  register: {
    data: {},
    status: 'initial'
  },
  verifyIndividual: {
    data: {},
    status: 'initial'
  },
  verifyCorporate: {
    data: {},
    status: 'initial'
  },
  verifyAccountOtp: {
    data: {},
    status: 'initial'
  },
  sendAccountOtp: {
    data: {},
    status: 'initial'
  },
  login: {
    data: {},
    status: 'initial'
  },
  forgotPassword: {
    data: {},
    status: 'initial'
  },
  changePassword: {
    data: {},
    status: 'initial'
  },
  resetPassword: {
    data: {},
    status: 'initial'
  }
};

const authenticationReducer = (state = initialState, { type, response, error }) => {
  switch (type) {
  case constants.REGISTER_PENDING:
    return {
      ...state,
      register: {
        data: {},
        status: 'pending'
      }
    };

  case constants.REGISTER_SUCCESS:
    return {
      ...state,
      register: {
        ...state.register,
        data: response,
        status: 'success'
      }
    };

  case constants.REGISTER_FAILURE:
    return {
      ...state,
      register: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.VERIFY_INDIVIDUAL_PENDING:
    return {
      ...state,
      verifyIndividual: {
        data: {},
        status: 'pending'
      }
    };

  case constants.VERIFY_INDIVIDUAL_SUCCESS:
    return {
      ...state,
      verifyIndividual: {
        ...state.verifyIndividual,
        data: response,
        status: 'success'
      }
    };

  case constants.VERIFY_INDIVIDUAL_FAILURE:
    return {
      ...state,
      verifyIndividual: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.VERIFY_CORPORATE_PENDING:
    return {
      ...state,
      verifyCorporate: {
        data: {},
        status: 'pending'
      }
    };

  case constants.VERIFY_CORPORATE_SUCCESS:
    return {
      ...state,
      verifyCorporate: {
        ...state.verifyCorporate,
        data: response,
        status: 'success'
      }
    };

  case constants.VERIFY_CORPORATE_FAILURE:
    return {
      ...state,
      verifyCorporate: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.VERIFY_ACCOUNT_OTP_PENDING:
    return {
      ...state,
      verifyAccountOtp: {
        data: {},
        status: 'pending'
      }
    };

  case constants.VERIFY_ACCOUNT_OTP_SUCCESS:
    return {
      ...state,
      verifyAccountOtp: {
        ...state.verifyAccountOtp,
        data: response,
        status: 'success'
      }
    };

  case constants.VERIFY_ACCOUNT_OTP_FAILURE:
    return {
      ...state,
      verifyAccountOtp: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.SEND_ACCOUNT_OTP_PENDING:
    return {
      ...state,
      sendAccountOtp: {
        data: {},
        status: 'pending'
      }
    };

  case constants.SEND_ACCOUNT_OTP_SUCCESS:
    return {
      ...state,
      sendAccountOtp: {
        ...state.sendAccountOtp,
        data: response,
        status: 'success'
      }
    };

  case constants.SEND_ACCOUNT_OTP_FAILURE:
    return {
      ...state,
      sendAccountOtp: {
        data: error || {},
        status: 'failed'
      }
    };
  case constants.LOGIN_PENDING:
    return {
      ...state,
      login: {
        data: {},
        status: 'pending'
      }
    };

  case constants.LOGIN_SUCCESS:
    return {
      ...state,
      login: {
        ...state.login,
        data: response,
        status: 'success'
      }
    };

  case constants.LOGIN_COMPLETE:
    return {
      ...state,
      login: {
        data: {},
        status: 'initial'
      }
    };

  case constants.LOGIN_FAILURE:
    return {
      ...state,
      login: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.FORGOT_PASSWORD_PENDING:
    return {
      ...state,
      login: {
        data: {},
        status: 'pending'
      }
    };

  case constants.FORGOT_PASSWORD_SUCCESS:
    return {
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        data: response,
        status: 'success'
      }
    };

  case constants.FORGOT_PASSWORD_FAILURE:
    return {
      ...state,
      forgotPassword: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.CHANGE_PASSWORD_PENDING:
    return {
      ...state,
      login: {
        data: {},
        status: 'pending'
      }
    };

  case constants.CHANGE_PASSWORD_SUCCESS:
    return {
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        data: response,
        status: 'success'
      }
    };

  case constants.CHANGE_PASSWORD_FAILURE:
    return {
      ...state,
      forgotPassword: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.RESET_PASSWORD_PENDING:
    return {
      ...state,
      login: {
        data: {},
        status: 'pending'
      }
    };

  case constants.RESET_PASSWORD_SUCCESS:
    return {
      ...state,
      resetPassword: {
        ...state.resetPassword,
        data: response,
        status: 'success'
      }
    };

  case constants.RESET_PASSWORD_FAILURE:
    return {
      ...state,
      resetPassword: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.UPLOAD_LOGO_PENDING:
    return {
      ...state,
      logo: {
        data: {},
        status: 'pending'
      }
    };

  case constants.UPLOAD_LOGO_PROGRESS:
    return {
      ...state,
      logProgress: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.UPLOAD_LOGO_SUCCESS:
    return {
      ...state,
      logo: {
        ...state.resetPassword,
        data: response,
        status: 'success'
      }
    };

  case constants.UPLOAD_LOGO_FAILURE:
    return {
      ...state,
      logo: {
        data: error || {},
        status: 'failed'
      }
    };

  default: return { ...state };
  }
};

export default authenticationReducer;
