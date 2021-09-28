import localforage from 'localforage';
import { post, get } from '../../services/fetch';
import constants from '../constants';

const dispatchConnection = (connection, pending, action) => async (dispatch) => {
  dispatch(pending(connection));
  return connection.then((response) => action({ response, dispatch }));
};

export const register = (payload) => {
  const request = (req) => ({ type: constants.REGISTER_PENDING, request: req });
  const success = (response) => ({ type: constants.REGISTER_SUCCESS, response });
  const failure = (error) => ({ type: constants.REGISTER_FAILURE, error });

  return async (dispatch) => {
    // const endpoints = {
    //   individual: 'REGISTER_INDIVIDUAL',
    //   corporate: 'REGISTER_CORPORATE'
    // };
    // const endpoint = typeof endpoints[type] !== 'undefined' && endpoints[type];
    const res = post({ endpoint: 'REGISTER', auth: false, body: payload });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200 || response?.status === 201) {
        localforage.setItem('user', response?.data?.data?.user);
        localStorage.setItem('token', response?.data?.data?.user?.token);
        localStorage.setItem('emailToken', response?.data?.data?.token);
        localStorage.setItem('user', JSON.stringify(response?.data?.data?.user));
        dispatch(success(response?.data));
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
    });
  };
};

export const verifyIndividual = (payload) => {
  const request = (req) => ({ type: constants.VERIFY_INDIVIDUAL_PENDING, request: req });
  const success = (response) => ({ type: constants.VERIFY_INDIVIDUAL_SUCCESS, response });
  const failure = (error) => ({ type: constants.VERIFY_INDIVIDUAL_FAILURE, error });
  const connection = get({ endpoint: 'VERIFY_INDIVIDUAL', auth: true, pQuery: payload });
  const dispatchActions = ({ response, dispatch }) => {
    if (response?.status === 200) {
      dispatch(success(response?.data));
    } else if (response) {
      dispatch(failure(response?.errors || response));
    } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
  };
  return dispatchConnection(connection, request, dispatchActions);
};

export const verifyCorporate = (payload) => {
  const request = (req) => ({ type: constants.VERIFY_CORPORATE_PENDING, request: req });
  const success = (response) => ({ type: constants.VERIFY_CORPORATE_SUCCESS, response });
  const failure = (error) => ({ type: constants.VERIFY_CORPORATE_FAILURE, error });
  const connection = get({
    endpoint: 'VERIFY_CORPORATE', auth: true, pQuery: payload
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

export const verifyAccountOtp = (payload) => {
  const request = (req) => ({ type: constants.VERIFY_ACCOUNT_OTP_PENDING, request: req });
  const success = (response) => ({ type: constants.VERIFY_ACCOUNT_OTP_SUCCESS, response });
  const failure = (error) => ({ type: constants.VERIFY_ACCOUNT_OTP_FAILURE, error });
  const connection = post({ endpoint: 'VERIFY_ACCOUNT_OTP', auth: true, body: payload });
  const dispatchActions = ({ response, dispatch }) => {
    if (response?.status === 200) {
      localforage.setItem('user', response?.data?.data?.user);
      localStorage.setItem('user', JSON.stringify(response?.data?.data?.user));
      dispatch(success(response?.data));
    } else if (response) {
      dispatch(failure(response?.errors || response));
    } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
  };
  return dispatchConnection(connection, request, dispatchActions);
};
export const sendAccountOtp = (payload) => {
  const request = (req) => ({ type: constants.SEND_ACCOUNT_OTP_PENDING, request: req });
  const success = (response) => ({ type: constants.SEND_ACCOUNT_OTP_SUCCESS, response });
  const failure = (error) => ({ type: constants.SEND_ACCOUNT_OTP_FAILURE, error });
  const connection = get({ endpoint: 'SEND_ACCOUNT_OTP', auth: true, pQuery: payload });
  const dispatchActions = ({ response, dispatch }) => {
    if (response?.status === 200) {
      dispatch(success(response?.data));
    } else if (response) {
      dispatch(failure(response?.errors || response));
    } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
  };
  return dispatchConnection(connection, request, dispatchActions);
};

export const login = (payload) => {
  const request = (req) => ({ type: constants.LOGIN_PENDING, request: req });
  const success = (response) => ({ type: constants.LOGIN_SUCCESS, response });
  const failure = (error) => ({ type: constants.LOGIN_FAILURE, error });

  return async (dispatch) => {
    const res = post({ endpoint: 'LOGIN', auth: true, body: payload });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200) {
        dispatch(success(response?.data));
        localforage.setItem('user', response?.data?.data?.user);
        localStorage.setItem('token', response?.data?.data?.user?.token);
        localStorage.setItem('user', JSON.stringify(response?.data?.data?.user));
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
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
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
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
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
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
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
    });
  };
};
export const uploadLogo = ({ payload, setProgress }) => {
  const request = (req) => ({ type: constants.UPLOAD_LOGO_PENDING, request: req });
  const success = (response) => ({ type: constants.UPLOAD_LOGO_SUCCESS, response });
  const failure = (error) => ({ type: constants.UPLOAD_LOGO_FAILURE, error });
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
      } else if (response) {
        dispatch(failure(response?.errors || response));
      } else dispatch(failure('we could not connect to the server at this time, please try again later.!'));
    });
  };
};
