import constants from '../constants';

const initialState = {
  projects: {
    data: {},
    status: 'initial'
  },
  profile: {
    data: {},
    status: 'initial'
  },
  corporateManagers: {
    data: {},
    status: 'initial'
  },
  personalAccounts: {
    data: {},
    status: 'initial'
  },
  editPersonalAccount: {
    data: {},
    status: 'initial'
  },
  changeManager: {
    data: {},
    status: 'initial'
  },
  notifications: {
    data: {},
    status: 'initial'
  }
};

const profileReducer = (state = initialState, { type, response, error }) => {
  switch (type) {
  case constants.MY_PROFILE_PENDING:
    return {
      ...state,
      profile: {
        data: {},
        status: 'pending'
      }
    };
  case constants.MY_PROFILE_SUCCESS:
    return {
      ...state,
      profile: {
        ...state.profile,
        data: response,
        status: 'success'
      }
    };
  case constants.MY_PROFILE_FAILURE:
    return {
      ...state,
      profile: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PROFILES_PENDING:
    return {
      ...state,
      profiles: {
        data: {},
        status: 'pending'
      }
    };
  case constants.PROFILES_SUCCESS:
    return {
      ...state,
      profiles: {
        ...state.profiles,
        data: response,
        status: 'success'
      }
    };
  case constants.PROFILES_FAILURE:
    return {
      ...state,
      profiles: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.PERSONAL_ACCOUNTS_PENDING:
    return {
      ...state,
      personalAccounts: {
        data: {},
        status: 'pending'
      }
    };
  case constants.PERSONAL_ACCOUNTS_SUCCESS:
    return {
      ...state,
      personalAccounts: {
        ...state.personalAccounts,
        data: response,
        status: 'success'
      }
    };
  case constants.PERSONAL_ACCOUNTS_FAILURE:
    return {
      ...state,
      personalAccounts: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.EDIT_PERSONAL_ACCOUNT_PENDING:
    return {
      ...state,
      editPersonalAccount: {
        data: {},
        status: 'pending'
      }
    };
  case constants.EDIT_PERSONAL_ACCOUNT_SUCCESS:
    return {
      ...state,
      editPersonalAccount: {
        ...state.editPersonalAccount,
        data: response,
        status: 'success'
      }
    };
  case constants.EDIT_PERSONAL_ACCOUNT_FAILURE:
    return {
      ...state,
      editPersonalAccount: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.CORPORATE_MANAGERS_PENDING:
    return {
      ...state,
      corporateManagers: {
        data: {},
        status: 'pending'
      }
    };
  case constants.CORPORATE_MANAGERS_SUCCESS:
    return {
      ...state,
      corporateManagers: {
        ...state.corporateManagers,
        data: response,
        status: 'success'
      }
    };
  case constants.CORPORATE_MANAGERS_FAILURE:
    return {
      ...state,
      corporateManagers: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.CHANGE_MANAGER_PENDING:
    return {
      ...state,
      changeManager: {
        data: {},
        status: 'pending'
      }
    };
  case constants.CHANGE_MANAGER_SUCCESS:
    return {
      ...state,
      changeManager: {
        ...state.changeManager,
        data: response,
        status: 'success'
      }
    };
  case constants.CHANGE_MANAGER_FAILURE:
    return {
      ...state,
      changeManager: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.MY_PROJECTS_PENDING:
    return {
      ...state,
      projects: {
        data: {},
        status: 'pending'
      }
    };
  case constants.MY_PROJECTS_SUCCESS:
    return {
      ...state,
      projects: {
        ...state.projects,
        data: response,
        status: 'success'
      }
    };
  case constants.MY_PROJECTS_FAILURE:
    return {
      ...state,
      projects: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.NOTIFICATIONS_PENDING:
    return {
      ...state,
      notifications: {
        data: {},
        status: 'pending'
      }
    };
  case constants.NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      notifications: {
        ...state.notifications,
        data: response,
        status: 'success'
      }
    };
  case constants.NOTIFICATIONS_FAILURE:
    return {
      ...state,
      notifications: {
        data: error || {},
        status: 'failed'
      }
    };

  default: return { ...state };
  }
};

export default profileReducer;
