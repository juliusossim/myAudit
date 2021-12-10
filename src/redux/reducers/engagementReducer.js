import constants from '../constants';

const initialState = {
  engagements: {
    data: {},
    status: 'initial'
  },
  dashboard: {
    data: {},
    status: 'initial'
  },
  engagement: {
    data: {},
    status: 'initial'
  },
  newEngagement: {
    data: {},
    status: 'initial'
  },
  editEngagement: {
    data: {},
    status: 'initial'
  },
  deleteEngagement: {
    data: {},
    status: 'initial'
  },
  notes: {
    data: {},
    status: 'initial'
  },
  newNote: {
    data: {},
    status: 'initial'
  },
  client: {
    data: {},
    status: 'initial'
  },
  deleteNote: {
    data: {},
    status: 'initial'
  },
  editNote: {
    data: {},
    status: 'initial'
  },
  uploads: {
    data: {},
    status: 'initial'
  },
  planning: {
    data: {},
    status: 'initial'
  },
  materiality: {
    data: {},
    status: 'initial'
  },
  tests: {
    data: {},
    status: 'initial'
  },
  misc: {
    data: {},
    status: 'initial'
  },
  execution: {
    data: {},
    status: 'initial'
  },
  conclusion: {
    data: {},
    status: 'initial'
  },
  inviteMember: {
    data: {},
    status: 'initial'
  },
  acceptInvite: {
    data: {},
    status: 'initial'
  },
  declineInvite: {
    data: {},
    status: 'initial'
  },
  index: {
    data: {},
    status: 'initial'
  }

};

const engagementReducer = (state = initialState, { type, response, error }) => {
  switch (type) {
  case constants.DASHBOARD_PENDING:
    return {
      ...state,
      dashboard: {
        data: {},
        status: 'pending'
      }
    };
  case constants.DASHBOARD_COMPLETE:
    return {
      ...state,
      dashboard: {
        data: {},
        status: 'initial'
      }
    };
  case constants.DASHBOARD_SUCCESS:
    return {
      ...state,
      dashboard: {
        ...state.dashboard,
        data: response,
        status: 'success'
      }
    };
  case constants.DASHBOARD_FAILURE:
    return {
      ...state,
      dashboard: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.ENGAGEMENT_PENDING:
    return {
      ...state,
      engagement: {
        data: {},
        status: 'pending'
      }
    };
  case constants.ENGAGEMENT_COMPLETE:
    return {
      ...state,
      engagement: {
        data: {},
        status: 'initial'
      }
    };
  case constants.ENGAGEMENT_SUCCESS:
    return {
      ...state,
      engagement: {
        ...state.engagement,
        data: response,
        status: 'success'
      }
    };
  case constants.ENGAGEMENT_FAILURE:
    return {
      ...state,
      engagement: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.CREATE_ENGAGEMENT_PENDING:
    return {
      ...state,
      newEngagement: {
        data: {},
        status: 'pending'
      }
    };
  case constants.CREATE_ENGAGEMENT_COMPLETE:
    return {
      ...state,
      newEngagement: {
        data: {},
        status: 'initial'
      }
    };
  case constants.CREATE_ENGAGEMENT_SUCCESS:
    return {
      ...state,
      newEngagement: {
        ...state.newEngagement,
        data: response,
        status: 'success'
      }
    };
  case constants.CREATE_ENGAGEMENT_FAILURE:
    return {
      ...state,
      newEngagement: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.ENGAGEMENTS_PENDING:
    return {
      ...state,
      engagements: {
        data: {},
        status: 'pending'
      }
    };
  case constants.ENGAGEMENTS_COMPLETE:
    return {
      ...state,
      engagements: {
        data: {},
        status: 'initial'
      }
    };
  case constants.ENGAGEMENTS_SUCCESS:
    return {
      ...state,
      engagements: {
        ...state.engagements,
        data: response,
        status: 'success'
      }
    };
  case constants.ENGAGEMENTS_FAILURE:
    return {
      ...state,
      engagements: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.EDIT_ENGAGEMENT_PENDING:
    return {
      ...state,
      editEngagement: {
        data: {},
        status: 'pending'
      }
    };
  case constants.EDIT_ENGAGEMENT_COMPLETE:
    return {
      ...state,
      editEngagement: {
        data: {},
        status: 'initial'
      }
    };
  case constants.EDIT_ENGAGEMENT_SUCCESS:
    return {
      ...state,
      editEngagement: {
        ...state.editEngagement,
        data: response,
        status: 'success'
      }
    };
  case constants.EDIT_ENGAGEMENT_FAILURE:
    return {
      ...state,
      editEngagement: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.DELETE_ENGAGEMENT_PENDING:
    return {
      ...state,
      deleteEngagement: {
        data: {},
        status: 'pending'
      }
    };
  case constants.DELETE_ENGAGEMENT_COMPLETE:
    return {
      ...state,
      deleteEngagement: {
        data: {},
        status: 'initial'
      }
    };
  case constants.DELETE_ENGAGEMENT_SUCCESS:
    return {
      ...state,
      deleteEngagement: {
        ...state.deleteEngagement,
        data: response,
        status: 'success'
      }
    };
  case constants.DELETE_ENGAGEMENT_FAILURE:
    return {
      ...state,
      deleteEngagement: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.NOTE_PENDING:
    return {
      ...state,
      client: {
        data: {},
        status: 'pending'
      }
    };
  case constants.NOTE_COMPLETE:
    return {
      ...state,
      client: {
        data: {},
        status: 'initial'
      }
    };
  case constants.NOTE_SUCCESS:
    return {
      ...state,
      client: {
        ...state.client,
        data: response,
        status: 'success'
      }
    };
  case constants.NOTE_FAILURE:
    return {
      ...state,
      client: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.NOTES_PENDING:
    return {
      ...state,
      notes: {
        data: {},
        status: 'pending'
      }
    };
  case constants.NOTES_COMPLETE:
    return {
      ...state,
      notes: {
        data: {},
        status: 'initial'
      }
    };
  case constants.NOTES_SUCCESS:
    return {
      ...state,
      notes: {
        ...state.notes,
        data: response,
        status: 'success'
      }
    };
  case constants.NOTES_FAILURE:
    return {
      ...state,
      notes: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.EDIT_NOTE_PENDING:
    return {
      ...state,
      editNote: {
        data: {},
        status: 'pending'
      }
    };
  case constants.EDIT_NOTE_COMPLETE:
    return {
      ...state,
      editNote: {
        data: {},
        status: 'initial'
      }
    };
  case constants.EDIT_NOTE_SUCCESS:
    return {
      ...state,
      editNote: {
        ...state.editNote,
        data: response,
        status: 'success'
      }
    };
  case constants.EDIT_NOTE_FAILURE:
    return {
      ...state,
      editNote: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.DELETE_NOTE_PENDING:
    return {
      ...state,
      deleteNote: {
        data: {},
        status: 'pending'
      }
    };
  case constants.DELETE_NOTE_COMPLETE:
    return {
      ...state,
      deleteNote: {
        data: {},
        status: 'initial'
      }
    };
  case constants.DELETE_NOTE_SUCCESS:
    return {
      ...state,
      deleteNote: {
        ...state.deleteNote,
        data: response,
        status: 'success'
      }
    };
  case constants.DELETE_NOTE_FAILURE:
    return {
      ...state,
      deleteNote: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.UPLOAD_MEDIA_PENDING:
    return {
      ...state,
      uploads: {
        data: {},
        status: 'pending'
      }
    };
  case constants.UPLOAD_MEDIA_COMPLETE:
    return {
      ...state,
      uploads: {
        data: {},
        status: 'initial'
      }
    };
  case constants.UPLOAD_MEDIA_SUCCESS:
    return {
      ...state,
      uploads: {
        ...state.uploads,
        data: response,
        status: 'success'
      }
    };
  case constants.UPLOAD_MEDIA_FAILURE:
    return {
      ...state,
      uploads: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PLANNING_PENDING:
    return {
      ...state,
      planning: {
        data: {},
        status: 'pending'
      }
    };
  case constants.PLANNING_COMPLETE:
    return {
      ...state,
      planning: {
        data: {},
        status: 'initial'
      }
    };
  case constants.PLANNING_SUCCESS:
    return {
      ...state,
      planning: {
        ...state.planning,
        data: response,
        status: 'success'
      }
    };
  case constants.PLANNING_FAILURE:
    return {
      ...state,
      planning: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.MATERIALITY_PENDING:
    return {
      ...state,
      materiality: {
        data: {},
        status: 'pending'
      }
    };
  case constants.MATERIALITY_COMPLETE:
    return {
      ...state,
      materiality: {
        data: {},
        status: 'initial'
      }
    };
  case constants.MATERIALITY_SUCCESS:
    return {
      ...state,
      materiality: {
        ...state.materiality,
        data: response,
        status: 'success'
      }
    };
  case constants.MATERIALITY_FAILURE:
    return {
      ...state,
      materiality: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.TESTS_PENDING:
    return {
      ...state,
      tests: {
        data: {},
        status: 'pending'
      }
    };
  case constants.TESTS_COMPLETE:
    return {
      ...state,
      tests: {
        data: {},
        status: 'initial'
      }
    };
  case constants.TESTS_SUCCESS:
    return {
      ...state,
      tests: {
        ...state.tests,
        data: response,
        status: 'success'
      }
    };
  case constants.TESTS_FAILURE:
    return {
      ...state,
      tests: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.MISC_PENDING:
    return {
      ...state,
      misc: {
        data: {},
        status: 'pending'
      }
    };
  case constants.MISC_COMPLETE:
    return {
      ...state,
      misc: {
        data: {},
        status: 'initial'
      }
    };
  case constants.MISC_SUCCESS:
    return {
      ...state,
      misc: {
        ...state.misc,
        data: response,
        status: 'success'
      }
    };
  case constants.MISC_FAILURE:
    return {
      ...state,
      misc: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.EXECUTION_PENDING:
    return {
      ...state,
      execution: {
        data: {},
        status: 'pending'
      }
    };
  case constants.EXECUTION_COMPLETE:
    return {
      ...state,
      execution: {
        data: {},
        status: 'initial'
      }
    };
  case constants.EXECUTION_SUCCESS:
    return {
      ...state,
      execution: {
        ...state.execution,
        data: response,
        status: 'success'
      }
    };
  case constants.EXECUTION_FAILURE:
    return {
      ...state,
      execution: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.CONCLUSION_PENDING:
    return {
      ...state,
      conclusion: {
        data: {},
        status: 'pending'
      }
    };
  case constants.CONCLUSION_COMPLETE:
    return {
      ...state,
      conclusion: {
        data: {},
        status: 'initial'
      }
    };
  case constants.CONCLUSION_SUCCESS:
    return {
      ...state,
      conclusion: {
        ...state.conclusion,
        data: response,
        status: 'success'
      }
    };
  case constants.CONCLUSION_FAILURE:
    return {
      ...state,
      conclusion: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.INVITE_TO_ENGAGEMENT_PENDING:
    return {
      ...state,
      inviteMember: {
        data: {},
        status: 'pending'
      }
    };
  case constants.INVITE_TO_ENGAGEMENT_COMPLETE:
    return {
      ...state,
      inviteMember: {
        data: {},
        status: 'initial'
      }
    };
  case constants.INVITE_TO_ENGAGEMENT_SUCCESS:
    return {
      ...state,
      inviteMember: {
        ...state.inviteMember,
        data: response,
        status: 'success'
      }
    };
  case constants.INVITE_TO_ENGAGEMENT_FAILURE:
    return {
      ...state,
      inviteMember: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.ACCEPT_INVITE_TO_ENGAGEMENT_PENDING:
    return {
      ...state,
      acceptInvite: {
        data: {},
        status: 'pending'
      }
    };
  case constants.ACCEPT_INVITE_TO_ENGAGEMENT_COMPLETE:
    return {
      ...state,
      acceptInvite: {
        data: {},
        status: 'initial'
      }
    };
  case constants.ACCEPT_INVITE_TO_ENGAGEMENT_SUCCESS:
    return {
      ...state,
      acceptInvite: {
        ...state.acceptInvite,
        data: response,
        status: 'success'
      }
    };
  case constants.ACCEPT_INVITE_TO_ENGAGEMENT_FAILURE:
    return {
      ...state,
      acceptInvite: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.DECLINE_INVITE_TO_ENGAGEMENT_PENDING:
    return {
      ...state,
      declineInvite: {
        data: {},
        status: 'pending'
      }
    };
  case constants.DECLINE_INVITE_TO_ENGAGEMENT_COMPLETE:
    return {
      ...state,
      declineInvite: {
        data: {},
        status: 'initial'
      }
    };
  case constants.DECLINE_INVITE_TO_ENGAGEMENT_SUCCESS:
    return {
      ...state,
      declineInvite: {
        ...state.declineInvite,
        data: response,
        status: 'success'
      }
    };
  case constants.DECLINE_INVITE_TO_ENGAGEMENT_FAILURE:
    return {
      ...state,
      declineInvite: {
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
  case constants.INDEX_COMPLETE:
    return {
      ...state,
      index: {
        data: {},
        status: 'initial'
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
        data: error || [],
        status: 'failed'
      }
    };

  default: return { ...state };
  }
};

export default engagementReducer;
