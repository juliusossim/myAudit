// import localforage from 'localforage';
import { post } from '../../services/fetch';
import constants from '../constants';

export const createProject = (payload) => {
  const request = (req) => ({ type: constants.PROJECT_PENDING, request: req });
  const success = (response) => ({ type: constants.PROJECT_SUCCESS, response });
  const failure = (error) => ({ type: constants.PROJECT_FAILURE, error });

  return async (dispatch) => {
    const res = post({ endpoint: 'CREATE_PROJECT', auth: false, body: payload });

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
