import localforage from 'localforage';
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
        console.log(response.message);
        dispatch(failure(response?.errors || response));
      } else {
        // console.log(response);
        dispatch(failure(res || 'we could not connect to the server at this time, please try again later.!'));
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
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
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
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
    });
  };
};
export const editProject1 = (payload) => {
  const request = (req) => ({ type: constants.EDIT_PROJECT_1_PENDING, request: req });
  const success = (response) => ({ type: constants.EDIT_PROJECT_1_SUCCESS, response });
  const failure = (error) => ({ type: constants.EDIT_PROJECT_1_FAILURE, error });
  console.log(payload.id);
  const connection = patch({
    endpoint: 'EDIT_PROJECT', auth: true, body: payload, param: payload.id
  });
  const dispatchActions = ({ response, dispatch }) => {
    if (response?.status === 200) {
      dispatch(success(response?.data));
    } else if (response) {
      dispatch(failure(response?.errors || response));
    } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
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
    } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
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
    } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
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
    } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
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
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
    });
  };
};
export const index = () => {
  const request = (req) => ({ type: constants.INDEX_PENDING, request: req });
  const success = (response) => ({ type: constants.INDEX_SUCCESS, response });
  const failure = (error) => ({ type: constants.INDEX_FAILURE, error });

  return async (dispatch) => {
    const res = get({ endpoint: 'INDEX' });

    dispatch(request(res));

    return res.then((response) => {
      dispatch(success(response?.data));
      if (response?.status === 200 || response?.status === 201) {
        dispatch(success(response?.data));
        // console.log(response?.data?.data);
        // localforage.setItem('index', response?.data?.data);
        // localStorage.setItem('index', JSON.stringify(response?.data?.data));
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
    });
  };
};

export const uploadMedia = ({ file, setProgress }) => {
  const request = (req) => ({ type: constants.UPLOAD_MEDIA_PENDING, request: req });
  const success = (response) => ({ type: constants.UPLOAD_MEDIA_SUCCESS, response });
  const failure = (error) => ({ type: constants.UPLOAD_MEDIA_FAILURE, error });
  const formData = new FormData();
  formData.append('document', file);
  console.log(formData);
  return async (dispatch) => {
    const res = post({
      endpoint: 'PROJECT_MEDIA',
      auth: true,
      body: formData,
      setProgress,
      multipart: true
    });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200) {
        dispatch(success(response?.data));
      } else if (response) {
        dispatch(failure(response));
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
    });
  };
};
export const resetAction = ({ action }) => async (
  dispatch
) => {
  dispatch({ type: constants[action] });
};
export const updateSuccess = ({ action, response }) => async (
  dispatch
) => {
  dispatch({ type: constants[action], response });
};

/* almighty action function */
export const projectAction = ({
  action, routeOptions, onSuccess
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
      if (response?.status === 200 || response?.status === 201) {
        dispatch(success(response?.data));
        // if (onSuccess !== undefined) {
        //   setTimeout(() => dispatch(constants[`${action}_${onSuccess}`]), 2000);
        // }
      } else if (response) {
        dispatch(failure(response));
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
