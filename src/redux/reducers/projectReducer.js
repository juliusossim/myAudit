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
  project1: {
    data: {},
    status: 'initial'
  },
  getProject: {
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
  },
  initProject: {
    data: {},
    status: 'initial'
  },
  media: {
    data: {},
    status: 'initial'
  },
  deleteMedia: {
    data: {},
    status: 'initial'
  },

  stateLga: {
    data: {},
    status: 'initial'
  },
  similarProjects: {
    data: {},
    status: 'initial'
  },
  editProjectRequest: {
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

  case constants.GET_PROJECT_PENDING:
    return {
      ...state,
      getProject: {
        data: {},
        status: 'pending'
      }
    };
  case constants.GET_PROJECT_SUCCESS:
    return {
      ...state,
      getProject: {
        ...state.getProject,
        data: response,
        status: 'success'
      }
    };
  case constants.GET_PROJECT_FAILURE:
    return {
      ...state,
      getProject: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.INIT_PROJECT_PENDING:
    return {
      ...state,
      initProject: {
        data: {},
        status: 'pending'
      }
    };
  case constants.INIT_PROJECT_SUCCESS:
    return {
      ...state,
      initProject: {
        ...state.initProject,
        data: response,
        status: 'success'
      }
    };
  case constants.INIT_PROJECT_FAILURE:
    return {
      ...state,
      initProject: {
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
  case constants.SUBMIT_PROJECT_FAILURE:
    return {
      ...state,
      submitProject: {
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

  case constants.EDIT_PROJECT_1_PENDING:
    return {
      ...state,
      project1: {
        data: {},
        status: 'pending'
      }
    };

  case constants.EDIT_PROJECT_1_SUCCESS:
    return {
      ...state,
      project1: {
        ...state.project1,
        data: response,
        status: 'success'
      }
    };

  case constants.EDIT_PROJECT_1_FAILURE:
    return {
      ...state,
      project1: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.EDIT_PROJECT_REQUEST_PENDING:
    return {
      ...state,
      editProjectRequest: {
        data: {},
        status: 'pending'
      }
    };

  case constants.EDIT_PROJECT_REQUEST_SUCCESS:
    return {
      ...state,
      editProjectRequest: {
        ...state.editProjectRequest,
        data: response,
        status: 'success'
      }
    };

  case constants.EDIT_PROJECT_REQUEST_FAILURE:
    return {
      ...state,
      editProjectRequest: {
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

  case constants.SIMILAR_PROJECTS_PENDING:
    return {
      ...state,
      similarProjects: {
        data: {},
        status: 'pending'
      }
    };

  case constants.SIMILAR_PROJECTS_SUCCESS:
    return {
      ...state,
      similarProjects: {
        ...state.similarProjects,
        data: response,
        status: 'success'
      }
    };

  case constants.SIMILAR_PROJECTS_FAILURE:
    return {
      ...state,
      similarProjects: {
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

  case constants.UPLOAD_MEDIA_PENDING:
    return {
      ...state,
      media: {
        data: {},
        status: 'pending'
      }
    };

  case constants.UPLOAD_MEDIA_PROGRESS:
    return {
      ...state,
      logProgress: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.UPLOAD_MEDIA_SUCCESS:
    return {
      ...state,
      media: {
        ...state.media,
        data: response,
        status: 'success'
      }
    };

  case constants.UPLOAD_MEDIA_FAILURE:
    return {
      ...state,
      media: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.DELETE_MEDIA_PENDING:
    return {
      ...state,
      deleteMedia: {
        data: {},
        status: 'pending'
      }
    };

  case constants.DELETE_MEDIA_SUCCESS:
    return {
      ...state,
      deleteMedia: {
        ...state.deleteMedia,
        data: response,
        status: 'success'
      }
    };

  case constants.DELETE_MEDIA_FAILURE:
    return {
      ...state,
      deleteMedia: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.STATE_LGAS_PENDING:
    return {
      ...state,
      stateLga: {
        data: {},
        status: 'pending'
      }
    };

  case constants.STATE_LGAS_SUCCESS:
    return {
      ...state,
      stateLga: {
        ...state.stateLga,
        data: response,
        status: 'success'
      }
    };

  case constants.STATE_LGAS_FAILURE:
    return {
      ...state,
      stateLga: {
        data: error || {},
        status: 'failed'
      }
    };

  default: return { ...state };
  }
};

export default projectReducer;
