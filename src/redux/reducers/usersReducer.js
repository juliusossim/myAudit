import constants from '../constants';

const initialState = {
  clients: {
    data: {},
    status: 'initial'
  },
  newClient: {
    data: {},
    status: 'initial'
  },
  client: {
    data: {},
    status: 'initial'
  },
  deleteClient: {
    data: {},
    status: 'initial'
  },
  editClient: {
    data: {},
    status: 'initial'
  }
};

const usersReducer = (state = initialState, { type, response, error }) => {
  switch (type) {
  case constants.CLIENTS_PENDING:
    return {
      ...state,
      clients: {
        data: {},
        status: 'pending'
      }
    };
  case constants.CLIENTS_COMPLETE:
    return {
      ...state,
      clients: {
        data: {},
        status: 'initial'
      }
    };
  case constants.CLIENTS_SUCCESS:
    return {
      ...state,
      clients: {
        ...state.clients,
        data: response,
        status: 'success'
      }
    };
  case constants.CLIENTS_FAILURE:
    return {
      ...state,
      clients: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.CLIENT_PENDING:
    return {
      ...state,
      client: {
        data: {},
        status: 'pending'
      }
    };
  case constants.CLIENT_COMPLETE:
    return {
      ...state,
      client: {
        data: {},
        status: 'initial'
      }
    };
  case constants.CLIENT_SUCCESS:
    return {
      ...state,
      client: {
        ...state.client,
        data: response,
        status: 'success'
      }
    };
  case constants.CLIENT_FAILURE:
    return {
      ...state,
      client: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.CREATE_CLIENT_PENDING:
    return {
      ...state,
      newClient: {
        data: {},
        status: 'pending'
      }
    };
  case constants.CREATE_CLIENT_COMPLETE:
    return {
      ...state,
      newClient: {
        data: {},
        status: 'initial'
      }
    };

  case constants.CREATE_CLIENT_SUCCESS:
    return {
      ...state,
      newClient: {
        ...state.newClient,
        data: response,
        status: 'success'
      }
    };

  case constants.CREATE_CLIENT_FAILURE:
    return {
      ...state,
      newClient: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.DELETE_CLIENT_PENDING:
    return {
      ...state,
      deleteClient: {
        data: {},
        status: 'pending'
      }
    };
  case constants.DELETE_CLIENT_COMPLETE:
    return {
      ...state,
      deleteClient: {
        data: {},
        status: 'initial'
      }
    };

  case constants.DELETE_CLIENT_SUCCESS:
    return {
      ...state,
      deleteClient: {
        ...state.deleteClient,
        data: response,
        status: 'success'
      }
    };

  case constants.DELETE_CLIENT_FAILURE:
    return {
      ...state,
      deleteClient: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.EDIT_CLIENT_PENDING:
    return {
      ...state,
      editClient: {
        data: {},
        status: 'pending'
      }
    };
  case constants.EDIT_CLIENT_COMPLETE:
    return {
      ...state,
      editClient: {
        data: {},
        status: 'initial'
      }
    };

  case constants.EDIT_CLIENT_SUCCESS:
    return {
      ...state,
      editClient: {
        ...state.editClient,
        data: response,
        status: 'success'
      }
    };

  case constants.EDIT_CLIENT_FAILURE:
    return {
      ...state,
      editClient: {
        data: error || {},
        status: 'failed'
      }
    };

  default: return { ...state };
  }
};

export default usersReducer;
