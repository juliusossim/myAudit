import constants from '../constants';

const initialState = {
  registerIndividual: {
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

  default: return { ...state };
  }
};

export default authenticationReducer;
