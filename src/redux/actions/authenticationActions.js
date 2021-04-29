import { get, post } from '../../services/fetch';
import constants from '../constants';

export const register = (payload) => {
  const request = (req) => ({ type: constants.REGISTER_PENDING, request: req });
  const success = (response) => ({ type: constants.REGISTER_SUCCESS, response });
  const failure = (error) => ({ type: constants.REGISTER_FAILURE, error });

  return async (dispatch) => {
    const res = post({ endpoint: 'REGISTER', auth: false, body: payload });

    dispatch(request(res));

    return res.then((response) => {
      if (response?.status === 200) {
        dispatch(success(response?.data));
      } else {
        dispatch(failure(response?.data));
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
      } else {
        dispatch(failure(response?.data));
      }
    });
  };
};
