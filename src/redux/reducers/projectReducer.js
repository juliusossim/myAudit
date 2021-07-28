import constants from '../constants';

const initialState = {
  projects: {
    data: {},
    status: 'initial'
  },
  project: {
    data: {},
    status: 'initial'
  },
  projectByStatus: {
    data: {},
    status: 'initial'
  },
  submitProject: {
    data: {},
    status: 'initial'
  },
  incompleteProjects: {
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
  },
  projectCategories: {
    data: {},
    status: 'initial'
  }
};

const projectReducer = (state = initialState, { type, response, error }) => {
  switch (type) {
  case constants.PROJECT_PENDING:
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

  case constants.SUBMIT_PROJECT_PENDING:
    return {
      ...state,
      submitProject: {
        data: {},
        status: 'pending'
      }
    };
  case constants.SUBMIT_PROJECT_SUCCESS:
    return {
      ...state,
      submitProject: {
        ...state.submitProject,
        data: response,
        status: 'success'
      }
    };
  case constants.PROJECT_FAILURE:
    return {
      ...state,
      submitProject: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PROJECT_BY_STATUS_PENDING:
    return {
      ...state,
      projectByStatus: {
        data: {},
        status: 'pending'
      }
    };
  case constants.PROJECT_BY_STATUS_SUCCESS:
    return {
      ...state,
      projectByStatus: {
        ...state.projectByStatus,
        data: response,
        status: 'success'
      }
    };
  case constants.PROJECT_BY_STATUS_FAILURE:
    return {
      ...state,
      projectByStatus: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.SUBMIT_PROJECT_PENDING:
    return {
      ...state,
      submit_project: {
        data: {},
        status: 'pending'
      }
    };
  case constants.SUBMIT_PROJECT_SUCCESS:
    return {
      ...state,
      submit_project: {
        ...state.submit_project,
        data: response,
        status: 'success'
      }
    };
  case constants.SUBMIT_PROJECT_FAILURE:
    return {
      ...state,
      submit_project: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.EDIT_PROJECT_PENDING:
    return {
      ...state,
      project: {
        data: {},
        status: 'pending'
      }
    };

  case constants.EDIT_PROJECT_SUCCESS:
    return {
      ...state,
      project: {
        ...state.project,
        data: response,
        status: 'success'
      }
    };

  case constants.EDIT_PROJECT_FAILURE:
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

  case constants.UPDATE_PROJECT_PENDING:
    return {
      ...state,
      updateProject: {
        data: {},
        status: 'pending'
      }
    };

  case constants.UPDATE_PROJECT_SUCCESS:
    return {
      ...state,
      updateProject: {
        ...state.updateProject,
        data: response,
        status: 'success'
      }
    };

  case constants.UPDATE_PROJECT_FAILURE:
    return {
      ...state,
      updateProject: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PROJECT_UPDATES_PENDING:
    return {
      ...state,
      projectUpdates: {
        data: {},
        status: 'pending'
      }
    };

  case constants.PROJECT_UPDATES_SUCCESS:
    return {
      ...state,
      projectUpdates: {
        ...state.projectUpdates,
        data: response,
        status: 'success'
      }
    };

  case constants.PROJECT_UPDATES_FAILURE:
    return {
      ...state,
      projectUpdates: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.EDIT_PROJECT_UPDATES_PENDING:
    return {
      ...state,
      editProjectUpdates: {
        data: {},
        status: 'pending'
      }
    };

  case constants.EDIT_PROJECT_UPDATES_SUCCESS:
    return {
      ...state,
      editProjectUpdates: {
        ...state.editProjectUpdates,
        data: response,
        status: 'success'
      }
    };

  case constants.EDIT_PROJECT_UPDATES_FAILURE:
    return {
      ...state,
      editProjectUpdates: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PROJECT_CATEGORIES_PENDING:
    return {
      ...state,
      projectCategories: {
        data: {},
        status: 'pending'
      }
    };

  case constants.PROJECT_CATEGORIES_SUCCESS:
    return {
      ...state,
      projectCategories: {
        ...state.projectCategories,
        data: response,
        status: 'success'
      }
    };

  case constants.PROJECT_CATEGORIES_FAILURE:
    return {
      ...state,
      projectCategories: {
        data: error || {},
        status: 'failed'
      }
    };

  default: return { ...state };
  }
};

export default projectReducer;
