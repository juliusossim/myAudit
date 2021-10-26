import _ from 'lodash';
import { sentenceCaps, stringDoesNotExist } from './stringOperations';

/**
 *
 * @param validation  the validations object
 * @param field  the form field to be validated
 * @param value  the value of the field
 * @returns {any} errors array to the component
 */
export const validateField = (validation, field, value) => {
  // console.log(value, validation, field);
  /*
    initialize errors array
  */
  const errors = [];
  /*
    validate required fields
  */
  validation?.required && stringDoesNotExist(value) && errors.push(`${sentenceCaps(field)} is required`);
  /*
    validate maximum characters
  */
  validation?.maxLength && (value?.length > validation?.maxLength)
  && errors.push(`${sentenceCaps(field)} is too long, it must not exceed ${validation.maxLength} characters`);
  /*
    validate minimum characters
  */
  validation?.minLength && (value?.length < validation?.minLength && value !== '')
  && errors.push(`${sentenceCaps(field)} is too short, it must exceed ${validation.minLength} characters`);
  /*
    validate maximum digits
  */
  validation?.max && value?.length > validation?.max
  && errors.push(`${sentenceCaps(field)} is too long, it must not exceed ${validation?.max} digits`);

  /*
    validate minimum digits
  */
  validation?.min && value?.length < validation?.min && value !== ''
  && errors.push(`${sentenceCaps(field)} is too short, it must exceed ${validation?.min} digits`);
  /*
  confirm password
  */
  validation?.confirmPassword && (value !== validation?.original && value !== '')
  && errors.push('passwords do not match!');
  /*
    validate patterns
   */
  validation?.pattern && !validation?.pattern?.test(value) && value !== ''
  && errors.push(`${sentenceCaps(field)} is invalid`);
  /*
    return errors
  */
  return errors;
};
/**
 * call the appropriate index -> {pattern:validationPatterns.email}'
 * @type {{domain: RegExp, email: RegExp, image: RegExp}}
 *  domain: reference index for domain fields pattern
 *
 * email: reference index for email fields pattern
 *
 * image: reference index for image fields pattern
 */
export const validationPatterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  domain: /^[A-Z0-9._%+-]+\.[A-Z]{2,}$/i,
  image: /\.(jpg|jpeg|png|gif)$/
};

export const test = (obj, dataLength) => (
  Object.keys(obj).length < dataLength && obj.constructor === Object
);
/**
 * control the submit button
 * @param obj
 * : the main payload object
 * @param error
 * : the error object.
 * @param setSubmittable
 * : the state that disable/enables the submit button
 * @param dataLength
 * the expected lenght of the obj| payload object.
 */
export const canSubmit = (obj, error, setSubmittable, dataLength) => {
  if (obj.constructor === Object) {
    const err = [];
    const equ = Object.keys(obj)?.length >= dataLength;
    if (error.constructor === Object) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, val] of Object.entries(error)) {
        if (val.constructor === Array) {
          val.length > 0 && err.push(val);
        }
      }
    }
    if (err.length === 0) {
      setSubmittable(equ);
    } else {
      setSubmittable(false);
    }
  }
};
/**
 * disables a button or notify of an error
 * @param stringFields {array}
 * @param amount {number}
 * @param numbFields {array}
 * @param errors {object}
 * @param less {boolean}
 */
export const shouldDisable = ({
  stringFields, amount, numbFields, errors, less
}) => {
  let errorTest; let amtTest;
  if (_.isEmpty(errors)) {
    errorTest = stringFields.some((item) => _.isEmpty(item));
  } else if (!_.isEmpty(stringFields)) {
    errorTest = stringFields.some((item) => Object.keys(errors).includes(item));
  }
  if (!_.isEmpty(numbFields)) {
    const thresholdTest = (amt) => (less
      ? amt < amount
      : amt > amount);
    amtTest = numbFields.every(thresholdTest);
  }
  return !!(errorTest || amtTest);
};

export const noErrors = (errors) => {
  const threshold = (amt) => _.isEmpty(amt);
  return _.every(errors, threshold);
};

export const checkRequiredFields = (data) => {
  const threshold = (str) => _.isNumber(str) || !_.isEmpty(str);
  return !_.isEmpty(data) ? _.every(data, threshold) : true;
};

export const errorsChecker = (errors) => {
  const err = [];
  if (errors.constructor === Object) {
    // eslint-disable-next-line no-unused-vars
    for (const [key, val] of Object.entries(errors)) {
      if (val.constructor === Array) {
        val.length > 0 && err.push(val);
      }
    }
  }
  // console.log('err.length', err.length > 0);
  return err.length > 0;
};
export const mapBackendErrors = (storeData) => {
  const backErrors = [];
  if (storeData?.constructor === Object) {
    // eslint-disable-next-line no-unused-vars
    for (const [key, val] of Object.entries(storeData)) {
      if (val?.constructor === Array) {
        val?.map(
          (backErr) => backErrors.push(backErr.message)
        );
      }
      if (val?.constructor === Object) {
        console.log('object', val);
        backErrors.push(val.message);
      }
    }
  }
  if (storeData?.constructor === Array) {
    storeData.map((er) => backErrors.push(er.message));
  } else {
    backErrors.push(storeData);
  }

  return backErrors;
};
export const mapErrorsToFields = (storeData) => {
  let backErrors = [];
  if (storeData?.constructor === Object) {
    if (!_.isEmpty(storeData.errors)) {
      backErrors = storeData.errors.map((item) => {
        const index = item.code || item.Title;
        if (!_.isNull(index)) {
          return ({
            [index]: item.message
          });
        }
        return null;
      });
    }
  }
  return backErrors;
};

// password validations
export const validatePassword = (password) => validationPatterns.password.test(password);
export const containSmallCaps = (str) => /(?=.*[a-z])/.test(str);
export const containCaps = (str) => /(?=.*[A-Z])/.test(str);
export const containNums = (str) => /(?=.*[0-9])/.test(str);
export const containSpecialChars = (str) => /(?=.*[!@#$%^&*])/.test(str);
export const eightOrLonger = (str) => /(?=.{8,})/.test(str);
