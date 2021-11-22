import constants from '../constants';

const initialState = {
  register: {
    data: {},
    status: 'initial'
  },
  inviteUser: {
    data: {},
    status: 'initial'
  },
  invitedUser: {
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
  },
  logout: {
    data: {},
    status: 'initial'
  },
  completeRegistration: {
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
  case constants.REGISTER_COMPLETE:
    return {
      ...state,
      register: {
        data: {},
        status: 'initial'
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

  case constants.INVITE_USER_PENDING:
    return {
      ...state,
      inviteUser: {
        data: {},
        status: 'pending'
      }
    };
  case constants.INVITE_USER_COMPLETE:
    return {
      ...state,
      inviteUser: {
        data: {},
        status: 'initial'
      }
    };
  case constants.INVITE_USER_SUCCESS:
    return {
      ...state,
      inviteUser: {
        ...state.inviteUser,
        data: response,
        status: 'success'
      }
    };
  case constants.INVITE_USER_FAILURE:
    return {
      ...state,
      inviteUser: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.REGISTER_INVITED_USER_PENDING:
    return {
      ...state,
      invitedUser: {
        data: {},
        status: 'pending'
      }
    };
  case constants.REGISTER_INVITED_USER_SUCCESS:
    return {
      ...state,
      invitedUser: {
        ...state.invitedUser,
        data: response,
        status: 'success'
      }
    };
  case constants.REGISTER_INVITED_USER_FAILURE:
    return {
      ...state,
      invitedUser: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.COMPLETE_REGISTRATION_PENDING:
    return {
      ...state,
      completeRegistration: {
        data: {},
        status: 'pending'
      }
    };
  case constants.COMPLETE_REGISTRATION_COMPLETE:
    return {
      ...state,
      completeRegistration: {
        data: {},
        status: 'initial'
      }
    };
  case constants.COMPLETE_REGISTRATION_SUCCESS:
    return {
      ...state,
      completeRegistration: {
        ...state.completeRegistration,
        data: response,
        status: 'success'
      }
    };
  case constants.COMPLETE_REGISTRATION_FAILURE:
    return {
      ...state,
      completeRegistration: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.LOGOUT_PENDING:
    return {
      ...state,
      logout: {
        data: {},
        status: 'pending'
      }
    };
  case constants.LOGOUT_COMPLETE:
    return {
      ...state,
      logout: {
        data: {},
        status: 'initial'
      }
    };

  case constants.LOGOUT_SUCCESS:
    return {
      ...state,
      logout: {
        ...state.logout,
        data: response,
        status: 'success'
      }
    };

  case constants.LOGOUT_FAILURE:
    return {
      ...state,
      logout: {
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
