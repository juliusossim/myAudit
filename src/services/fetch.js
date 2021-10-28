import axios from 'axios';
import paths from './endpoints';
import { notifier } from '../utilities/stringOperations';
import { logout } from '../utilities/auth';

// const getToken = () => {
//   const t = decodeToken('t');
//   const token = t && t.t;
//   return token;
// };

const fetchBackend = async (
  endpoint, method, auth, body,
  pQuery, param, multipart, afterParam, setProgress
) => {
  const headers = {
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json'
    // 'Ocp-Apim-Subscription-Key': process.env.REACT_APP_APIM_KEY
  };
  // console.log(headers);

  const path = paths[endpoint] || endpoint;
  let url = `${process.env.REACT_APP_BACKEND_URL}${path}`;

  if (param) {
    url += `/${param}`;
  }
  if (afterParam) {
    url += `/${afterParam}`;
  }

  if (pQuery) {
    const paramsArray = Object.keys(pQuery).map((key) => pQuery[key] && `${encodeURIComponent(key)}=${encodeURIComponent(pQuery[key])}`);

    url += `?${paramsArray.join('&')}`;
  }

  if (auth) {
    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;
  }
  const options = {
    url, method, headers
  };

  if (body) {
    options.data = body;
  }

  if (setProgress) {
    let progress = 0;
    options.onUploadProgress = (uploadEvent) => {
      const { loaded, total } = uploadEvent;
      progress = Math.floor((loaded / total) * 100);
      setProgress(progress);
    };
  }

  return axios(options)
    .then((res) => res, async (err) => {
      // console.log(err.response?.data);
      // || err?.response?.status === 403
      if ((err?.response?.status === 401) && window.location.pathname !== '/login') {
        // notifiy user
        notifier({
          type: 'info',
          title: 'Protected Route',
          text: 'You need to be authenticated to access this content'
        });
        //
        //   // log the user out and return
        await logout(process.env.REACT_APP_JWT_SECRET, true);
        window.location.replace('/login');
      }
      return err?.response?.data;
    });
};

// export const uploadFile = (file, setProgress, handleSuccess) => {
//   const imageFormData = new FormData();
//   imageFormData.append('file', file);
//   let access_token = getStorageData("access_token", true);
//
//   let progress = 0;
//   axios({
//     baseURL: process.env.REACT_APP_BACKEND_URL,
//     url: "cfcore/Uploads/project/",
//     method: "post",
//     headers: {
//       authorization: `Bearer ${localforage.getItem('token')}`,
//       Accept: "application/json",
//       "Content-Type": "multipart/form-data",
//     },
//     data: imageFormData,
//     onUploadProgress: (uploadEvent) => {
//       const { loaded, total } = uploadEvent;
//       progress = Math.floor((loaded / total) * 100);
//       setProgress(progress);
//     },
//   }).then((response) => handleSuccess(response));
// };

export const uploadFile = ({
  file, method, url, handleProgress
}) => {
  let progress = 0;
  const data = new FormData();
  data.append('file', file);
  axios({
    baseURL: process.env.REACT_APP_BASE_URL,
    method: method || 'post',
    url,
    data,
    onUploadProgress: (uploadEvent) => {
      const { loaded, total } = uploadEvent;
      progress = Math.floor((loaded / total) * 100);
      handleProgress(progress);
    }
  })
    .then(
      (res) => {
        console.log(res);
      }
    );
};

/**
 *
 * @param {string} endpoint
 * @param {object} pQuery
 * @param {string} param
 * @param {boolean} auth
 * @param {string} afterParam
 */
export const get = ({
  endpoint, pQuery, param = null, auth = true, afterParam
}) => fetchBackend(endpoint, 'GET', auth, null, pQuery, param, null, afterParam);

/**
 *
 * @param {string} endpoint
 * @param {string} afterParam
 * @param {object} body
 * @param {string} param
 * @param {boolean} auth
 * @param {boolean} multipart
 * @param {function} setProgress
 */
export const post = ({
  endpoint, body, auth = true, multipart, param, afterParam, setProgress
}) => fetchBackend(endpoint, 'POST', auth, body, null, param, multipart, afterParam, setProgress);

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
 * @param {string} pQuery
 * @param {string} afterParam
 */
export const del = ({
  endpoint, param, auth = true, pQuery, afterParam
}) => fetchBackend(endpoint, 'DELETE', auth, null, pQuery, param, false, afterParam);

/**
 *@param {string} method
 *@param {string} param
 *@param {boolean} auth
 *@param {boolean} multipart
 *@param {any} body
 *@param {string} endpoint
 *@param {object} pQuery
 *@param {string} afterParam
 *@param {function} setProgress
 */

export const apiOptions = ({
  method, param, auth = false, body, setProgress,
  endpoint, pQuery, afterParam, multipart
}) => (
  {
    method,
    options: {
      param,
      afterParam,
      body,
      auth,
      endpoint,
      pQuery,
      multipart,
      setProgress
    }
  }
);
