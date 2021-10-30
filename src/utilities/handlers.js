import { notifier, slugToString } from './stringOperations';
import { validateField } from './validation';

export const changeHandler = ({
  e, formData, setFormData, callback
}) => {
  const {
    name, value, files, apiValue
  } = e?.target;
  if (name === 'media' && typeof callback === 'function' && formData?.file?.indexOf(files[0] === -1)) {
    const fileSize = (files[0]?.size / 1024 / 1024).toFixed(3);
    if (fileSize > 1) {
      return notifier({
        type: 'error',
        title: 'error',
        text: `the media size of ${fileSize}MB is too large, size must not be larger than 1MB`
      });
    }
    setFormData({
      ...formData,
      file: [...formData.file, files[0]]
    });
    callback();
  } else {
    let val = value;
    if (name === 'projectType' || name === 'categoryId') {
      val = Number(val);
    }
    setFormData((state) => ({
      ...state,
      ...replacedName(name, apiValue),
      [name]: val
    }));
  }
  return true;
};

export const blurHandler = ({
  e, validations, setErrors, errors
}) => {
  const { name, value } = e.target;
  const field = slugToString(name);
  typeof field !== 'undefined'
  && setErrors(
    {
      ...errors,
      [name]: (
        validateField(validations, field, value)
      )
    }
  );
};

export const checkHandler = ({ e, setFormData, formData }) => {
  const { name } = e.target;

  setFormData({
    ...formData,
    [name]: formData[name] === 1 ? 0 : 1
  });
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

export const tagsHandler = ({
  e, formData, setFormData, setVal
}) => {
  const { value, name } = e.target;
  if (e.keyCode === 188) {
    setFormData({
      ...formData,
      [name]: [...formData[name], value]
    });
    setVal('');
  }
};
