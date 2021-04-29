import axios from 'axios';
import paths from './endpoints';

import { decodeToken, logout } from '../utilities/auth';

const getToken = () => {
  const t = decodeToken('t');
  const token = t && t.t;
  return token;
};

const fetchBackend = async (endpoint, method, auth, body, pQuery, param, multipart) => {
  const headers = {
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json'
    // 'Content-Type': 'application/json'
  };
  const path = paths[endpoint] || endpoint;
  let url = `${process.env.REACT_APP_BACKEND_URL}${path}`;

  if (param) {
    url += `/${param}`;
  }

  if (pQuery) {
    const paramsArray = Object.keys(pQuery).map((key) => pQuery[key] && `${encodeURIComponent(key)}=${encodeURIComponent(pQuery[key])}`);

    url += `?${paramsArray.join('&')}`;
  }

  if (auth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  const options = {
    url, method, headers
  };

  if (body) {
    options.data = body;
  }

  console.log(options);
  return axios(options)
    .then((res) => res?.data, async (err) => {
      if (err && err.response && err.response.status === 401) {
        // console.log(err.response);
        // log the user out and return
        // await logout(process.env.REACT_APP_JWT_SECRET, true);
      }
      return err?.response?.data;
    });
};

/**
 *
 * @param {string} endpoint
 * @param {object} pQuery
 * @param {string} param
 * @param {boolean} auth
 */
export const get = ({
  endpoint, pQuery, param = null, auth = true
}) => fetchBackend(endpoint, 'GET', auth, null, pQuery, param);

/**
 *
 * @param {string} endpoint
 * @param {object} body
 * @param {string} param
 * @param {boolean} auth
 * @param {boolean} multipart
 */
export const post = ({
  endpoint, body, auth = true, multipart, param
}) => fetchBackend(endpoint, 'POST', auth, body, null, param, multipart);

/**
 *
 * @param {string} endpoint
 * @param {object} body
 * @param {string} param
 * @param {string} pQuery
 * @param {boolean} auth
 * @param {boolean} multipart
 */
export const patch = ({
  endpoint, body, param, pQuery, auth = true, multipart
}) => fetchBackend(endpoint, 'PATCH', auth, body, pQuery, param, multipart);

/**
 *
 * @param {string} endpoint
 * @param {string} param
 * @param {boolean} auth
 */
export const del = ({
  endpoint, param, auth = true
}) => fetchBackend(endpoint, 'DELETE', auth, null, null, param);
