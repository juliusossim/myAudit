// import localforage from 'localforage';
import { get, patch, post } from '../../services/fetch';
import constants from '../constants';

const dispatchConnection = (connection, pending, action) => async (dispatch) => {
  dispatch(pending(connection));
  return connection.then((response) => action({ response, dispatch }));
};

export const myProfile = () => {
  const request = (req) => ({ type: constants.MY_PROFILE_PENDING, request: req });
  const success = (response) => ({ type: constants.MY_PROFILE_SUCCESS, response });
  const failure = (error) => ({ type: constants.MY_PROFILE_FAILURE, error });

  return async (dispatch) => {
    const res = get({ endpoint: 'ME', auth: true });

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
export const personalAccounts = () => {
  const request = (req) => ({ type: constants.PERSONAL_ACCOUNTS_PENDING, request: req });
  const success = (response) => ({ type: constants.PERSONAL_ACCOUNTS_SUCCESS, response });
  const failure = (error) => ({ type: constants.PERSONAL_ACCOUNTS_FAILURE, error });

  return async (dispatch) => {
    const res = get({ endpoint: 'PERSONAL_ACCOUNTS', auth: true });

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

export const corporateManagers = (payload) => {
  const request = (req) => ({ type: constants.CORPORATE_MANAGERS_PENDING, request: req });
  const success = (response) => ({ type: constants.CORPORATE_MANAGERS_SUCCESS, response });
  const failure = (error) => ({ type: constants.CORPORATE_MANAGERS_FAILURE, error });

  return async (dispatch) => {
    const res = post({ endpoint: 'CORPORATE_MANAGERS', auth: true });

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

export const editPersonalAccount = (payload) => {
  const request = (req) => ({ type: constants.EDIT_PERSONAL_ACCOUNT_PENDING, request: req });
  const success = (response) => ({ type: constants.EDIT_PERSONAL_ACCOUNT_SUCCESS, response });
  const failure = (error) => ({ type: constants.EDIT_PERSONAL_ACCOUNT_FAILURE, error });
  const connection = patch({
    endpoint: 'EDIT_PERSONAL_ACCOUNT', auth: true, body: payload, param: payload.id
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
export const changeManager = (payload) => {
  const request = (req) => ({ type: constants.CHANGE_MANAGER_PENDING, request: req });
  const success = (response) => ({ type: constants.CHANGE_MANAGER_SUCCESS, response });
  const failure = (error) => ({ type: constants.CHANGE_MANAGER_FAILURE, error });
  const connection = patch({
    endpoint: 'CHANGE_MANAGER', auth: true, body: payload, param: payload.id
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
export const myProjects = () => {
  const request = (req) => ({ type: constants.MY_PROJECTS_PENDING, request: req });
  const success = (response) => ({ type: constants.MY_PROJECTS_SUCCESS, response });
  const failure = (error) => ({ type: constants.MY_PROJECTS_FAILURE, error });
  const connection = get({
    endpoint: 'MY_PROJECTS', auth: true
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

export const profiles = () => {
  const request = (req) => ({ type: constants.PROFILES_PENDING, request: req });
  const success = (response) => ({ type: constants.PROFILES_SUCCESS, response });
  const failure = (error) => ({ type: constants.PROFILES_FAILURE, error });

  return async (dispatch) => {
    const res = get({ endpoint: 'PROFILES' });

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
