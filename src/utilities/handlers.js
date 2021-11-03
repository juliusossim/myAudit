import _ from 'lodash';
import { notifier, slugToString, stringDoesNotExist } from './stringOperations';
import { validateField } from './validation';
import { uploadMedia } from '../redux/actions/projectActions';

export const changeHandler = ({
  e, setFormData, setProgress, setCurrentName, dispatch
}) => {
  const {
    name, value, files, apiValue
  } = e?.target;
  if (!_.isEmpty(files)) {
    setCurrentName(name);
    fileUploadMultiple({
      e, setProgress, dispatch
    });
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

export const fileUploadMultiple = ({ setProgress, e, dispatch }) => {
  const { files } = e.target;
  // quit if file already exists or there is no backend api handler
  // if (typeof callback !== 'function' || formData[name]?.indexOf(files[0] > -1)) { return false; }
  if (stringDoesNotExist(files[0]?.name)) {
    return false;
  }

  // check file size limit and notify if exceeded
  const fileSize = (files[0]?.size
    / Number(process.env.REACT_APP_FILE_LIMIT)
    / Number(process.env.REACT_APP_FILE_LIMIT)).toFixed(3);

  // if (fileSize > 1) {
  //   return notifier({
  //     type: 'error',
  //     title: 'error',
  //     text: `the media size of ${fileSize}MB is too large,
  //     size must not be larger than ${process.env.REACT_APP_FILE_LIMIT_VALUE}`
  //   });
  // }
  // update file list and callback
  // setFormData({
  //   ...formData,
  //   [name]: [...formData[name], files[0]]
  // });
  dispatch(uploadMedia({
    payload: files[0],
    setProgress
  }));
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
    return ({ [`${name}_id`]: apiValue });
  }
  return false;
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

export const dragHandler = (e) => {
  e?.preventDefault();
  e.stopPropagation();
};
export const dragInHandler = (e, dragCounter, setDragCounter, setDrag) => {
  e.preventDefault();
  e.stopPropagation();
  setDragCounter(dragCounter + 1);
  if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
    setDrag(true);
  }
};
export const dragOutHandler = (e, dragCounter, setDragCounter, setDrag) => {
  e.preventDefault();
  e.stopPropagation();
  setDragCounter(dragCounter - 1);
  if (dragCounter === 0) {
    setDrag(false);
  }
};
export const dropHandler = (e, dragCounter, setDragCounter, setDrag, handleDrop) => {
  e.preventDefault();
  e.stopPropagation();
  setDrag(false);
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    handleDrop(e.dataTransfer.files);
    e.dataTransfer.clearData();
    setDragCounter(0);
  }
};
// handleDrop = (files) => {
//   let fileList = this.state.files
//   for (var i = 0; i < files.length; i++) {
//     if (!files[i].name) return
//     fileList.push(files[i].name)
//   }
//   this.setState({files: fileList})
// }
