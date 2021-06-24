// import localforage from 'localforage';
import { get, patch, post } from '../../services/fetch';
import constants from '../constants';

const dispatchConnection = (connection, pending, action) => async (dispatch) => {
  dispatch(pending(connection));
  return connection.then((response) => action({ response, dispatch }));
};

export const createProjectName = (payload) => {
  const request = (req) => ({ type: constants.PROJECT_PENDING, request: req });
  const success = (response) => ({ type: constants.PROJECT_SUCCESS, response });
  const failure = (error) => ({ type: constants.PROJECT_FAILURE, error });

  return async (dispatch) => {
    const res = post({ endpoint: 'CREATE_PROJECT_NAME', auth: true, body: payload });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        dispatch(success(response?.data));
      } else {
        dispatch(failure(response?.errors ? response.errors : response));
      }
    });
  };
};
export const createProject = (payload) => {
  const request = (req) => ({ type: constants.PROJECT_PENDING, request: req });
  const success = (response) => ({ type: constants.PROJECT_SUCCESS, response });
  const failure = (error) => ({ type: constants.PROJECT_FAILURE, error });

  return async (dispatch) => {
    const res = post({ endpoint: 'CREATE_PROJECT', auth: true, body: payload });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        dispatch(success(response?.data));
      } else {
        dispatch(failure(response?.errors ? response.errors : response));
      }
    });
  };
};

export const editProject = (payload) => {
  const request = (req) => ({ type: constants.EDIT_PROJECT_PENDING, request: req });
  const success = (response) => ({ type: constants.EDIT_PROJECT_SUCCESS, response });
  const failure = (error) => ({ type: constants.EDIT_PROJECT_FAILURE, error });
  const connection = patch({
    endpoint: 'EDIT_PROJECT', auth: true, body: payload, param: payload.id
  });
  const dispatchActions = ({ response, dispatch }) => {
    if (response?.status === 200) {
      dispatch(success(response?.data));
    } else {
      dispatch(failure(response));
    }
  };
  return dispatchConnection(connection, request, dispatchActions);
};

export const submitProject = (payload) => {
  const request = (req) => ({ type: constants.PROJECT_PENDING, request: req });
  const success = (response) => ({ type: constants.PROJECT_SUCCESS, response });
  const failure = (error) => ({ type: constants.PROJECT_FAILURE, error });
  const connection = post({
    endpoint: 'SUBMIT_PROJECT', auth: true, body: payload, param: payload.id, afterParam: 'submit'
  });
  const dispatchActions = ({ response, dispatch }) => {
    if (response?.status === 200) {
      dispatch(success(response?.data));
    } else {
      dispatch(failure(response));
    }
  };
  return dispatchConnection(connection, request, dispatchActions);
};

export const projectByStatus = () => {
  const request = (req) => ({ type: constants.PROJECT_BY_STATUS_PENDING, request: req });
  const success = (response) => ({ type: constants.PROJECT_BY_STATUS_SUCCESS, response });
  const failure = (error) => ({ type: constants.PROJECT_BY_STATUS_FAILURE, error });
  const connection = get({
    endpoint: 'PROJECT_BY_STATUS', auth: true
  });
  const dispatchActions = ({ response, dispatch }) => {
    if (response?.status === 200) {
      dispatch(success(response?.data));
    } else {
      dispatch(failure(response));
    }
  };
  return dispatchConnection(connection, request, dispatchActions);
};

export const projectCategories = () => {
  const request = (req) => ({ type: constants.PROJECT_CATEGORIES_PENDING, request: req });
  const success = (response) => ({ type: constants.PROJECT_CATEGORIES_SUCCESS, response });
  const failure = (error) => ({ type: constants.PROJECT_CATEGORIES_FAILURE, error });

  return async (dispatch) => {
    const res = get({ endpoint: 'PROJECT_CATEGORIES' });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        dispatch(success(response?.data));
      } else {
        dispatch(failure(response?.errors ? response.errors : response));
      }
    });
  };
};

export const uploadLogo = ({ payload, setProgress }) => {
  const request = (req) => ({ type: constants.UPLOAD_LOGO_PENDING, request: req });
  const success = (response) => ({ type: constants.UPLOAD_LOGO_SUCCESS, response });
  const failure = (error) => ({ type: constants.UPLOAD_LOGO_FAILURE, error });
  const data = new FormData();
  data.append('file', payload.file);
  return async (dispatch) => {
    const res = post({
      endpoint: 'PROJECT_MEDIA',
      auth: true,
      body: data,
      setProgress,
      param: payload.id,
      multipart: true
    });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200) {
        dispatch(success(response?.data));
      } else {
        dispatch(failure(response));
      }
    });
  };
};
