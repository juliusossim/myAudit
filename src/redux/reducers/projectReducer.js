import constants from '../constants';

const initialState = {
  newProject: {
    data: {},
    status: 'initial'
  },
  projects: {
    data: {},
    status: 'initial'
  },
  project: {
    data: {},
    status: 'initial'
  },
  projectDetails: {
    data: {},
    status: 'initial'
  },
  projectSummary: {
    data: {},
    status: 'initial'
  },
  projectMedia: {
    data: {},
    status: 'initial'
  }
};

const projectReducer = (state = initialState, { type, response, error }) => {
  switch (type) {
  case constants:
    return {
      ...state,
      project: {
        data: {},
        status: 'pending'
      }
    };

  case constants.PROJECT_SUCCESS:
    return {
      ...state,
      project: {
        ...state.project,
        data: response,
        status: 'success'
      }
    };

  case constants.PROJECT_FAILURE:
    return {
      ...state,
      project: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PROJECT_DETAILS_PENDING:
    return {
      ...state,
      projectDetails: {
        data: {},
        status: 'pending'
      }
    };

  case constants.PROJECT_DETAILS_SUCCESS:
    return {
      ...state,
      projectDetails: {
        ...state.projectDetails,
        data: response,
        status: 'success'
      }
    };

  case constants.PROJECT_DETAILS_FAILURE:
    return {
      ...state,
      projectDetails: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PROJECT_SUMMARY_PENDING:
    return {
      ...state,
      login: {
        data: {},
        status: 'pending'
      }
    };

  case constants.PROJECT_SUMMARY_SUCCESS:
    return {
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        data: response,
        status: 'success'
      }
    };

  case constants.PROJECT_SUMMARY_FAILURE:
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

export default projectReducer;
