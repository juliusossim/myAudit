import React from 'react';
import { projectAction } from '../../redux/actions/projectActions';
import { blurHandler, changeHandler, checkHandler } from '../../utilities/handlers';
import useStoreParams from './useStoreParams';

const useBoilerPlate = ({
  store, formData, setFormData, dispatch, setErrors,
  errors, setProgress, setCurrentName
}) => {
  const {
    data, status, message
  } = useStoreParams(store);

  const callback = React.useCallback(({ options }) => {
    dispatch(projectAction(
      {
        action: options.action,
        routeOptions: options.apiOpts
      }
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    changeHandler({
      e, setFormData, setProgress, setCurrentName, dispatch
    });
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
