import React from 'react';
import { useDispatch } from 'react-redux';
import useBoilerPlate from './useBoilerPlate';

const useViewBoilerPlate = ({
  store, formData, setFormData,
  successCallback, options
}) => {
  const dispatch = useDispatch();

  const {
    handleChange, handleChecked, handleBlur, message, data, status, callback
  } = useBoilerPlate({
    store, formData, setFormData, dispatch
  });

  React.useEffect(() => {
    if (status === 'initial') {
      view();
    }
    if (status === 'success') {
      setFormData(data);
      typeof successCallback === 'function'
      && successCallback();
    }
  }, [status]);

  const view = () => callback({ options }, []);

  return ({
    handleChecked,
    handleChange,
    view,
    handleBlur,
    data,
    status,
    message
  });
};
export default useViewBoilerPlate;
