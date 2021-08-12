// import localforage from 'localforage';
import {
  get, patch, post, del
} from '../../services/fetch';
import constants from '../constants';

const dispatchConnection = (connection, pending, action) => async (dispatch) => {
  dispatch(pending(connection));
  return connection.then((response) => action({ response, dispatch }));
};

export const createProjectName = (payload) => {
  const request = (req) => ({ type: constants.INIT_PROJECT_PENDING, request: req });
  const success = (response) => ({ type: constants.INIT_PROJECT_SUCCESS, response });
  const failure = (error) => ({ type: constants.INIT_PROJECT_FAILURE, error });

  return async (dispatch) => {
    const res = post({ endpoint: 'CREATE_PROJECT_NAME', auth: true, body: payload });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        dispatch(success(response?.data));
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('You are currently not connected to the internet!'));
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
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('You are currently not connected to the internet!'));
    });
  };
};
export const getProject = (payload) => {
  const request = (req) => ({ type: constants.GET_PROJECT_PENDING, request: req });
  const success = (response) => ({ type: constants.GET_PROJECT_SUCCESS, response });
  const failure = (error) => ({ type: constants.GET_PROJECT_FAILURE, error });

  return async (dispatch) => {
    const res = get({ endpoint: 'GET_PROJECT', auth: true, param: payload });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        dispatch(success(response?.data));
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('You are currently not connected to the internet!'));
    });
  };
};
export const editProject1 = (payload) => {
  const request = (req) => ({ type: constants.EDIT_PROJECT_1_PENDING, request: req });
  const success = (response) => ({ type: constants.EDIT_PROJECT_1_SUCCESS, response });
  const failure = (error) => ({ type: constants.EDIT_PROJECT_1_FAILURE, error });
  const connection = patch({
    endpoint: 'EDIT_PROJECT', auth: true, body: payload, param: payload.id
  });
  const dispatchActions = ({ response, dispatch }) => {
    if (response?.status === 200) {
      dispatch(success(response?.data));
    } else if (response) {
      dispatch(failure(response?.errors || response));
    } else dispatch(failure('You are currently not connected to the internet!'));
  };
  return dispatchConnection(connection, request, dispatchActions);
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
    } else if (response) {
      dispatch(failure(response?.errors || response));
    } else dispatch(failure('You are currently not connected to the internet!'));
  };
  return dispatchConnection(connection, request, dispatchActions);
};

export const submitProject = (payload) => {
  const request = (req) => ({ type: constants.SUBMIT_PROJECT_PENDING, request: req });
  const success = (response) => ({ type: constants.SUBMIT_PROJECT_SUCCESS, response });
  const failure = (error) => ({ type: constants.SUBMIT_PROJECT_FAILURE, error });
  const connection = post({
    endpoint: 'SUBMIT_PROJECT', auth: true, body: payload, param: payload.id, afterParam: 'submit'
  });
  const dispatchActions = ({ response, dispatch }) => {
    if (response?.status === 200) {
      dispatch(success(response?.data));
    } else if (response) {
      dispatch(failure(response?.errors || response));
    } else dispatch(failure('You are currently not connected to the internet!'));
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
    } else if (response) {
      dispatch(failure(response?.errors || response));
    } else dispatch(failure('You are currently not connected to the internet!'));
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
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('You are currently not connected to the internet!'));
    });
  };
};

export const uploadMedia = ({ payload, setProgress }) => {
  const request = (req) => ({ type: constants.UPLOAD_MEDIA_PENDING, request: req });
  const success = (response) => ({ type: constants.UPLOAD_MEDIA_SUCCESS, response });
  const failure = (error) => ({ type: constants.UPLOAD_MEDIA_FAILURE, error });
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
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('You are currently not connected to the internet!'));
    });
  };
};

/* almighty action function */
export const projectAction = ({
  action, routeOptions
}) => {
  const request = (req) => ({ type: constants[`${action}_PENDING`], request: req });
  const success = (response) => ({ type: constants[`${action}_SUCCESS`], response });
  const failure = (error) => ({ type: constants[`${action}_FAILURE`], error });
  const methods = {
    get: () => get({ ...routeOptions.options }),
    post: () => post({ ...routeOptions.options }),
    patch: () => patch({ ...routeOptions.options }),
    del: () => del({ ...routeOptions.options })
  };
  return async (dispatch) => {
    const res = methods[routeOptions.method]();
    dispatch(request(res));
    return res.then((response) => {
      if (response?.status === 200) {
        dispatch(success(response?.data));
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('connection failed, you are probably not connected to the internet!'));
    });
  };
};

// post({
//   endpoint: 'PROJECT_MEDIA',
//   auth: true,
//   body: data,
//   setProgress,
//   param: payload.id,
//   multipart: true
// });
