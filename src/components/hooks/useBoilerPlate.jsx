import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { notifier, slugToString, stringDoesNotExist } from '../../utilities/stringOperations';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import { blurHandler, changeHandler, checkHandler } from '../../utilities/handlers';
import useStoreParams from './useStoreParams';

const useBoilerPlate = ({
  store, formData, setFormData, dispatch, setErrors,
  errors
}) => {
  const {
    data, status, message
  } = useStoreParams(store);

  const callback = useCallback(({ options }) => {
    dispatch(projectAction(
      {
        action: options.action,
        routeOptions: options.apiOpts
      }
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    changeHandler({ e, formData, setFormData });
  };
  const handleChecked = (e) => checkHandler({ e, setFormData, formData });
  const handleBlur = (e, validations) => blurHandler({
    e, validations, setErrors, errors
  });

  return ({
    handleChecked,
    handleChange,
    callback,
    handleBlur,
    data,
    status,
    message
  });
};
export default useBoilerPlate;
