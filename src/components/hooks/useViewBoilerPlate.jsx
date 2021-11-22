import React from 'react';
import _, { isFunction } from 'lodash';
import { useDispatch } from 'react-redux';
import useBoilerPlate from './useBoilerPlate';
import useUpdateStore from './useUpdateStore';
import { stringDoesNotExist } from '../../utilities/stringOperations';

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
  const pushUpdates = useUpdateStore;

  React.useEffect(() => {
    if (status === 'success') {
      setFormData(data);
      isFunction(successCallback) && successCallback();
    }
  }, [status]);

  React.useEffect(() => {
    view();
  }, []);

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
