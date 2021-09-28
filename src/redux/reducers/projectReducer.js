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
  detailsSimilar: {
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
  searchProjects: {
    data: {},
    status: 'initial'
  },
  editProjectRequest: {
    data: {},
    status: 'initial'
  },
  deleteProject: {
    data: {},
    status: 'initial'
  },
  stopProject: {
    data: {},
    status: 'initial'
  },
  comment: {
    data: {},
    status: 'initial'
  },
  commentsDonors: {
    data: {},
    status: 'initial'
  },
  userTransactions: {
    data: {},
    status: 'initial'
  },
  paymentInitiate: {
    data: {},
    status: 'initial'
  },
  index: {
    data: {},
    status: 'initial'
  },
  paymentComplete: {
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

  case constants.DETAILS_SIMILAR_PENDING:
    return {
      ...state,
      detailsSimilar: {
        data: {},
        status: 'pending'
      }
    };

  case constants.DETAILS_SIMILAR_SUCCESS:
    return {
      ...state,
      detailsSimilar: {
        ...state.detailsSimilar,
        data: response,
        status: 'success'
      }
    };

  case constants.DETAILS_SIMILAR_FAILURE:
    return {
      ...state,
      detailsSimilar: {
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

  case constants.SEARCH_PROJECTS_PENDING:
    return {
      ...state,
      searchProjects: {
        data: {},
        status: 'pending'
      }
    };

  case constants.SEARCH_PROJECTS_SUCCESS:
    return {
      ...state,
      searchProjects: {
        ...state.searchProjects,
        data: response,
        status: 'success'
      }
    };

  case constants.SEARCH_PROJECTS_FAILURE:
    return {
      ...state,
      searchProjects: {
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

  case constants.DELETE_PROJECT_PENDING:
    return {
      ...state,
      deleteProject: {
        data: {},
        status: 'pending'
      }
    };

  case constants.DELETE_PROJECT_SUCCESS:
    return {
      ...state,
      deleteProject: {
        ...state.deleteProject,
        data: response,
        status: 'success'
      }
    };
  case constants.DELETE_PROJECT_COMPLETE:
    return {
      ...state,
      deleteProject: {
        data: {},
        status: 'initial'
      }
    };

  case constants.DELETE_PROJECT_FAILURE:
    return {
      ...state,
      deleteProject: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.STOP_PROJECT_PENDING:
    return {
      ...state,
      stopProject: {
        data: {},
        status: 'pending'
      }
    };

  case constants.STOP_PROJECT_SUCCESS:
    return {
      ...state,
      stopProject: {
        ...state.stopProject,
        data: response,
        status: 'success'
      }
    };

  case constants.STOP_PROJECT_FAILURE:
    return {
      ...state,
      stopProject: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PROJECT_COMMENTS_PENDING:
    return {
      ...state,
      comment: {
        data: {},
        status: 'pending'
      }
    };

  case constants.PROJECT_COMMENTS_SUCCESS:
    return {
      ...state,
      comment: {
        ...state.comment,
        data: response,
        status: 'success'
      }
    };

  case constants.PROJECT_COMMENTS_FAILURE:
    return {
      ...state,
      comment: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.COMMENTS_DONORS_PENDING:
    return {
      ...state,
      commentsDonors: {
        data: {},
        status: 'pending'
      }
    };

  case constants.COMMENTS_DONORS_SUCCESS:
    return {
      ...state,
      commentsDonors: {
        ...state.commentsDonors,
        data: response,
        status: 'success'
      }
    };

  case constants.COMMENTS_DONORS_FAILURE:
    return {
      ...state,
      commentsDonors: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.USER_TRANSACTIONS_PENDING:
    return {
      ...state,
      userTransactions: {
        data: {},
        status: 'pending'
      }
    };

  case constants.USER_TRANSACTIONS_SUCCESS:
    return {
      ...state,
      userTransactions: {
        ...state.userTransactions,
        data: response,
        status: 'success'
      }
    };

  case constants.USER_TRANSACTIONS_FAILURE:
    return {
      ...state,
      userTransactions: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PAYMENT_INITIATE_PENDING:
    return {
      ...state,
      paymentInitiate: {
        data: {},
        status: 'pending'
      }
    };

  case constants.PAYMENT_INITIATE_SUCCESS:
    return {
      ...state,
      paymentInitiate: {
        ...state.paymentInitiate,
        data: response,
        status: 'success'
      }
    };

  case constants.PAYMENT_INITIATE_FAILURE:
    return {
      ...state,
      paymentInitiate: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PAYMENT_COMPLETE_PENDING:
    return {
      ...state,
      paymentComplete: {
        data: {},
        status: 'pending'
      }
    };

  case constants.PAYMENT_COMPLETE_SUCCESS:
    return {
      ...state,
      paymentComplete: {
        ...state.paymentComplete,
        data: response,
        status: 'success'
      }
    };

  case constants.PAYMENT_COMPLETE_FAILURE:
    return {
      ...state,
      paymentComplete: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.INDEX_PENDING:
    return {
      ...state,
      index: {
        data: {},
        status: 'pending'
      }
    };

  case constants.INDEX_SUCCESS:
    return {
      ...state,
      index: {
        ...state.index,
        data: response,
        status: 'success'
      }
    };

  case constants.INDEX_FAILURE:
    return {
      ...state,
      index: {
        data: error || {},
        status: 'failed'
      }
    };

  default: return { ...state };
  }
};

export default projectReducer;
