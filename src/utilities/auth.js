import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import localforage from 'localforage';

/**
 * This function encodes its payload into a token
 * @param {object || string} payload the value to be encoded
 * @param {string} name the name that will be stored in the localStorage
 */
export const encodeToken = (payload, name) => {
  const token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET);

  localStorage.setItem(name, token);
};

/**
 * this function decodes the token value for the name supplied if it exists
 * @param {string} tokenName the token to be decoded
 * @param {string} index index url that will be redirected to if the decoding process fails
 * @param {boolean} logoutUser indicates if the user should be taken back to the index page or not
 */
export const decodeToken = (tokenName,
  index = process.env.REACT_APP_INDEX_URL,
  logoutUser = true) => {
  try {
    const item = localStorage.getItem(tokenName);
    if (!item) {
      logoutUser && logout(index);
      return null;
    }
    return jwt.verify(item, process.env.REACT_APP_JWT_SECRET);
  } catch (err) {
    console.log(err);
    logoutUser && logout(index);
  }
  return null;
};

/**
 * This function hashes a password and returns the hash in hex format.
 * @param {string} password the password that you want to hash
 * @returns {string} string value of the hash in hex format
 */
export const hashPassword = (password) => crypto
  .createHash('sha512').update(password).digest('hex');

/**
 * this function checks the response from an API call to know if the user is unauthorized.
 * It logs the user out if he/she is unauthorized.
 * @param {object} res response from the API call
 * @param {string} index index url that will be redirected to if the response status is 401
 */
export const checkUnauthorized = (res, index = process.env.REACT_APP_INDEX_URL) => {
  if (res && res.status === 401) {
    logout(index, true);
  }
};

export const logout = async (landingPath = process.env.REACT_APP_INDEX_URL,
  isExpiredSession = false) => {
  await localforage.clear();
  localStorage.clear();
  isExpiredSession && localStorage.setItem('se', true);
  window.location.assign(landingPath);
};
export const doLogout = () => {
  localforage.clear();
  localStorage.clear();
  window.location.assign(process.env.REACT_APP_INDEX_URL);
};
export const getToken = () => localStorage.getItem('access_token');
export const currentUser = localforage.getItem('user', (err, value) => {
  if (value?.status === 1) {
    return value.data?.user;
  }
  return false;
});
