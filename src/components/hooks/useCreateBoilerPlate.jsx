import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { notifier, slugToString, stringDoesNotExist } from '../../utilities/stringOperations';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import { blurHandler, changeHandler, checkHandler } from '../../utilities/handlers';
import useStoreParams from './useStoreParams';
import useBoilerPlate from './useBoilerPlate';

const useCreateBoilerPlate = ({
  store, formData, setFormData, dispatch, setErrors, push, options, errors, redirect
}) => {
  const {
    backErrors, message
  } = useStoreParams(store);

  const {
    handleChange, handleChecked, handleBlur, data, status, callback
  } = useBoilerPlate({
    store, formData, setFormData, dispatch, setErrors, errors
  });
  useEffect(() => {
    if (status === 'success') {
      notifier({
        type: 'success',
        text: 'Created successfully',
        title: 'Success'
      });
      !_.isEmpty(data)
      && push(redirect);
    }
    if (status === 'failed') {
      notifier({
        type: 'error',
        text: message,
        title: 'Error'
      });
      !_.isEmpty(backErrors)
      && setErrors(backErrors);
    }
  }, [status]);

  const create = () => callback({ options });

  return ({
    handleChecked,
    handleChange,
    create,
    handleBlur,
    data,
    status
  });
};
export default useCreateBoilerPlate;
