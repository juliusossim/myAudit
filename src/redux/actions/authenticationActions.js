import localforage from 'localforage';
import { post } from '../../services/fetch';
import constants from '../constants';

export const register = (payload, type = 'individual') => {
  const request = (req) => ({ type: constants.REGISTER_PENDING, request: req });
  const success = (response) => ({ type: constants.REGISTER_SUCCESS, response });
  const failure = (error) => ({ type: constants.REGISTER_FAILURE, error });

  return async (dispatch) => {
    const endpoints = {
      individual: 'REGISTER_INDIVIDUAL',
      corporate: 'REGISTER_CORPORATE'
    };
    const endpoint = typeof endpoints[type] !== 'undefined' && endpoints[type];
    const res = post({ endpoint, auth: false, body: payload });

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
export const login = (payload) => {
  const request = (req) => ({ type: constants.LOGIN_PENDING, request: req });
  const success = (response) => ({ type: constants.LOGIN_SUCCESS, response });
  const failure = (error) => ({ type: constants.LOGIN_FAILURE, error });

  return async (dispatch) => {
    const res = post({ endpoint: 'LOGIN', auth: false, body: payload });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200) {
        dispatch(success(response?.data));
        localforage.setItem('user', response.data);
      } else {
        dispatch(failure(response));
      }
    });
  };
};

export const changePassword = (payload) => {
  const request = (req) => ({ type: constants.CHANGE_PASSWORD_PENDING, request: req });
  const success = (response) => ({ type: constants.CHANGE_PASSWORD_SUCCESS, response });
  const failure = (error) => ({ type: constants.CHANGE_PASSWORD_FAILURE, error });

  return async (dispatch) => {
    const res = post({
      endpoint: 'CHANGE_PASSWORD', auth: true, body: payload
    });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200) {
        dispatch(success(response?.data));
      } else {
        dispatch(failure(response?.errors));
      }
    });
  };
};
export const forgotPassword = (payload) => {
  const request = (req) => ({ type: constants.FORGOT_PASSWORD_PENDING, request: req });
  const success = (response) => ({ type: constants.FORGOT_PASSWORD_SUCCESS, response });
  const failure = (error) => ({ type: constants.FORGOT_PASSWORD_FAILURE, error });

  return async (dispatch) => {
    const res = post({ endpoint: 'FORGOT_PASSWORD', auth: false, body: payload });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200) {
        dispatch(success(response?.data));
      } else {
        // console.log(response);
        dispatch(failure(response));
      }
    });
  };
};
export const resetPassword = (payload) => {
  const request = (req) => ({ type: constants.RESET_PASSWORD_PENDING, request: req });
  const success = (response) => ({ type: constants.RESET_PASSWORD_SUCCESS, response });
  const failure = (error) => ({ type: constants.RESET_PASSWORD_FAILURE, error });

  return async (dispatch) => {
    const res = post({
      endpoint: 'RESET_PASSWORD', auth: false, body: payload
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
export const uploadLogo = ({ payload, setProgress }) => {
  const request = (req) => ({ type: constants.UPLOAD_LOGO_PENDING, request: req });
  const success = (response) => ({ type: constants.UPLOAD_LOGO_SUCCESS, response });
  const failure = (error) => ({ type: constants.UPLOAD_LOGO_FAILURE, error });
  console.log('here');
  return async (dispatch) => {
    const res = post({
      endpoint: 'LOGO',
      auth: true,
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
