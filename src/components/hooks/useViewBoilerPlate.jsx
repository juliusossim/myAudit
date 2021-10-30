import React from 'react';
import useBoilerPlate from './useBoilerPlate';

const useViewBoilerPlate = ({
  store, formData, setFormData, dispatch,
  successCallback, options
}) => {
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

  const view = () => callback({ options });

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
