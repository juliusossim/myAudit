import constants from '../constants';

const initialState = {
  popularFundraisers: {
    data: {},
    status: 'initial'
  },
  popularNgos: {
    data: {},
    status: 'initial'
  },
  popularProjects: {
    data: {},
    status: 'initial'
  }
};

const homeReducer = (state = initialState, { type, response, error }) => {
  switch (type) {
  case constants.POPULAR_NGOS_PENDING:
    return {
      ...state,
      popularNgos: {
        data: {},
        status: 'pending'
      }
    };
  case constants.POPULAR_NGOS_SUCCESS:
    return {
      ...state,
      popularNgos: {
        ...state.popularNgos,
        data: response,
        status: 'success'
      }
    };
  case constants.POPULAR_NGOS_FAILURE:
    return {
      ...state,
      popularNgos: {
        data: error || {},
        status: 'failed'
      }
    };

  case constants.POPULAR_FUNDRAISERS_PENDING:
    return {
      ...state,
      popularFundraisers: {
        data: {},
        status: 'pending'
      }
    };
  case constants.POPULAR_FUNDRAISERS_SUCCESS:
    return {
      ...state,
      popularFundraisers: {
        ...state.popularFundraisers,
        data: response,
        status: 'success'
      }
    };
  case constants.POPULAR_FUNDRAISERS_FAILURE:
    return {
      ...state,
      popularFundraisers: {
        data: error || {},
        status: 'failed'
      }
    };
  case constants.POPULAR_PROJECTS_PENDING:
    return {
      ...state,
      popularProjects: {
        data: {},
        status: 'pending'
      }
    };

  case constants.POPULAR_PROJECTS_SUCCESS:
    return {
      ...state,
      popularProjects: {
        ...state.popularProjects,
        data: response,
        status: 'success'
      }
    };

  case constants.POPULAR_PROJECTS_FAILURE:
    return {
      ...state,
      popularProjects: {
        data: error || {},
        status: 'failed'
      }
    };

  default: return { ...state };
  }
};

export default homeReducer;
