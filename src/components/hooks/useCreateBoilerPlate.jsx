import React from 'react';
import _, { isFunction } from 'lodash';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import useStoreParams from './useStoreParams';
import useBoilerPlate from './useBoilerPlate';
import useUpdateStore from './useUpdateStore';

const useCreateBoilerPlate = ({
  store, formData, setFormData, setErrors, options, errors, setProgress, setCurrentName, action,
  pushUpdatesArr, redirect, noRedirect
}) => {
  const { goBack, push } = useHistory();
  const dispatch = useDispatch();
  const {
    backErrors, message
  } = useStoreParams(store);

  const pushUpdates = useUpdateStore;

  const {
    handleChange, handleChecked, handleBlur, data, status, callback
  } = useBoilerPlate({
    store, formData, setFormData, dispatch, setErrors, errors, setProgress, setCurrentName
  });
  React.useEffect(() => {
    if (status === 'success') {
      if (!stringDoesNotExist(action)) {
        _.isEmpty(pushUpdatesArr)
          ? pushUpdates([
            {
              data,
              action
            }
          ], dispatch)
          : pushUpdates([
            {
              data,
              action
            },
            ...pushUpdatesArr
          ], dispatch);
      }
      notifier({
        type: 'success',
        text: message,
        title: 'Success'
      });
      if (!noRedirect) {
        setTimeout(stringDoesNotExist(redirect) ? goBack : push(redirect), 500);
      }
    }
    if (status === 'failed') {
      notifier({
        type: 'error',
        text: message,
        title: 'Error'
      });
      pushUpdates([
        {
          data,
          action
        }
      ], dispatch);
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
    status,
    message,
    backErrors
  });
};
export default useCreateBoilerPlate;
