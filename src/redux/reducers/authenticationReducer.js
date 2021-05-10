import constants from '../constants';

const initialState = {
  register: {
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
  default: return { ...state };
  }
};

export default authenticationReducer;
