import React from 'react';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/PNotifyBrightTheme.css';
import _ from 'lodash';
import SvgIcon from '@material-ui/core/SvgIcon';

export const CustomIcon = ({ props, path }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <SvgIcon {...props}>
    <path d={path} />
  </SvgIcon>
);

/**
 *converts slug to string
 * @param slug the slug to convert to normal string
 * @param dash the slug pattern
 * @returns {*} the converted normal string
 */
export const slugToString = (slug, dash = '_') => {
  const result = slug.split(dash);
  for (let i = 0; i < result.length;) {
    const word = result[i];
    result[i] = word.charAt(0).toUpperCase() + word.slice(1);
    i += 1;
  }
  const text = result.join(' ');
  text.replace('alt', '');
  return text.replace('id', '');
};
/**
 *converts camelCase to strings
 * @param camelCase
 * @returns {string}
 */

export const camelToString = (camelCase) => camelCase
  .replace(/\W+/g, ' ')
  .replace(/([a-z\d])([A-Z])/g, '$1 $2')
  .toLowerCase().replace('id', '');

/**
 * this converts normal strings to a slug
 *
 * N.B: the string must be blank separated i.e a normal string!
 * @param string string to convert to slug
 * @param dash the slug pattern
 * @returns {*} the converted slug
 */
export const slugify = (string, dash = '_') => !stringDoesNotExist(string) && string.replace(' ', dash);

/**
 * @param fullName :
  * full name to dissect
 * @param first :
  * boolean value to determine the return value. this value is true by default.
 * if first is true, first name will be returned otherwise, last name is returned
 * @returns {*} first name or last name.
 */
export const getOneName = (fullName, first = true) => {
  const names = fullName.split(' ');
  return first ? names[0] : names[1];
};

/**
 * @param {number} den :
 * denominator, full amount
 * @param {number} num :
 * numerator, current amount.
 * @param {number} percent: optional percent value
 * @param {boolean} complete: should show complete instead of value above 100%
 * @returns {string} percentage || complete || num || 0.
 */
export const percentCalculator = ({
  den, num, percent, complete = true
}) => {
  let value = '0%';
  if (_.isNumber(percent) && _.isNumber(den)) {
    value = (percent * den) / 100;
    value = value.toLocaleString();
  }
  if (_.isNumber(num) && _.isNumber(den)) {
    value = (num / den) * 100;
    if (complete) {
      value = value > 101 ? 'Fully' : `${value.toFixed(0)}%`;
    } else {
      value = `${value}%`;
    }
  }
  return value;
};

/**
 *  converts locale string to number
 * @param {string} str :
 * @returns {number} || 0.
 */
export const localStringToNumber = (str) => {
  if (stringDoesNotExist(str)) {
    return notifier({
      type: 'error',
      title: 'Not supported',
      text: 'not a valid string'
    });
  }
  return parseFloat(str.replace(/\D/g, ''));
};

/**
 *  converts locale string to number
 * @param {string} str :
 * @param {function} callback :
 * @returns {number} || 0.
 */
export const copyText = ({ str, callback }) => {
  if (stringDoesNotExist(str)) {
    return notifier({
      type: 'error',
      title: 'Not Copied',
      text: 'not a valid string'
    });
  }
  navigator.clipboard.writeText(str);
  return callback();
};
export const stringDoesNotExist = (str) => (typeof str !== 'string' || str?.length === 0 || /^\s*$/.test(str) || !str?.trim());
export const notifier = ({
  type, title, text, stack
}) => {
  PNotify[type]({
    title,
    text
  });
};

export const stringCaps = (string) => {
  if (!stringDoesNotExist(string)) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
};
export const sentenceCaps = (text) => {
  if (!stringDoesNotExist(text)) {
    text.replace(/(^\s*)|(\s*$)/gi, '');
    text.replace(/[ ]{2,}/gi, ' ');
    text.replace(/\n /, '\n');
    const words = text.split(' ');
    return words.map((word) => stringCaps(word).toString()).join(' ');
  }
  return false;
};
export const replacedName = (name, apiValue) => {
  if (apiValue) {
    if (name === 'lga') {
      return ({ lgaId: apiValue });
    }
    if (name === 'state') {
      return ({ stateId: apiValue });
    }
  }
  return {};
};

export const removeCommas = (str) => !stringDoesNotExist(str) && str.replace(/[^\d.]/g, '');

/**
 *removes comas (,) and converts to integers.
 * especially used to convert currency amount to numbers
 * @param {string}  amount: the string to convert to number.
 * @returns {number}.
 */
export const formatDonation = (amount) => Number(removeCommas(amount));

/**
 *splits full name to first, middle, and last names.
 * @param {string}  fullName: the string to spit.
 * @returns {alert || object}.
 */
export const splitFullName = (fullName) => {
  if (stringDoesNotExist(fullName)) {
    return notifier({
      type: 'error',
      title: 'Empty Full Name',
      text: 'Please Enter Your Full Name'
    });
  }
  const arr = fullName.split(' ');
  let result = {
    firstName: _.head(arr),
    lastName: _.last(arr)
  };
  if (arr.length > 2) {
    result = { ...result, middleName: arr[1] };
  }
  return result;
};

/**
 *gets full name from first, middle, and last names.
 * @param {array}  names: array of names.
 * @returns {alert || object}.
 */
export const makeFullName = (names) => names.join(' ');
