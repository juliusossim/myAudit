import React from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { notifier } from '../../utilities/stringOperations';
import useStoreParams from './useStoreParams';
import useBoilerPlate from './useBoilerPlate';

const useCreateBoilerPlate = ({
  store, formData, setFormData, setErrors, options, errors, redirect
}) => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const {
    backErrors, message
  } = useStoreParams(store);

  const {
    handleChange, handleChecked, handleBlur, data, status, callback
  } = useBoilerPlate({
    store, formData, setFormData, dispatch, setErrors, errors
  });
  React.useEffect(() => {
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
