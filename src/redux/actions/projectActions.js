// import localforage from 'localforage';
import { get, patch, post } from '../../services/fetch';
import constants from '../constants';

const dispatchConnection = (connection, pending, action) => async (dispatch) => {
  dispatch(pending(connection));
  return connection.then((response) => action({ response, dispatch }));
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
  console.log(payload.id);
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

// export const editProject = (payload) => {
//   const request = (req) => ({ type: constants.EDIT_PROJECT_PENDING, request: req });
//   const success = (response) => ({ type: constants.EDIT_PROJECT_SUCCESS, response });
//   const failure = (error) => ({ type: constants.EDIT_PROJECT_FAILURE, error });
//   console.log(payload.id);
//   const connection = patch({
//     endpoint: 'EDIT_PROJECT', auth: true, body: payload, param: payload.id
//   });
//   const dispatchActions = ({ response, dispatch }) => {
//     if (response?.status === 200) {
//       dispatch(success(response?.data));
//     } else {
//       dispatch(failure(response));
//     }
//   };
//   return dispatchConnection(connection, request, dispatchActions);
// };

export const uploadLogo = ({ payload, setProgress }) => {
  const request = (req) => ({ type: constants.UPLOAD_LOGO_PENDING, request: req });
  const success = (response) => ({ type: constants.UPLOAD_LOGO_SUCCESS, response });
  const failure = (error) => ({ type: constants.UPLOAD_LOGO_FAILURE, error });
  console.log('here');
  return async (dispatch) => {
    const res = post({
      endpoint: 'LOGO',
      auth: false,
      body: payload,
      setProgress,
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
