/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import _ from 'lodash';
import { uploadMedia } from '../../redux/actions/projectActions';
import useStoreParams from './useStoreParams';
import { notifier } from '../../utilities/stringOperations';
import useUpdateStore from './useUpdateStore';

/**
 * @param action
 * @param store
 * @param formData
 * @param setFormData
 * @param name
 * @param setErrors
 * @param setProgress
 * @param files
 */

const useFileUploadService = ({
  store, formData, setFormData, name, setErrors, setProgress, files, dispatch
}) => {
  const {
    backErrors, message, status, data
  } = useStoreParams(store);
  const pushUpdates = useUpdateStore([{
    data,
    action: 'UPLOAD_COMPLETE'
  }], dispatch);

  const images = formData[name];
  // const imagesCopy = images;

  React.useEffect(() => {
    switch (status) {
    case 'failed':
      notifier({
        title: 'Upload Failed',
        text: message || 'failed to upload file',
        type: 'error'
      });
      setErrors(backErrors);
      return pushUpdates;
    case 'success':
      if (!_.isEmpty(images)) {
        // images?.pop();
        setFormData({
          ...formData,
          [name]: [...formData[name], data]
        });
      } else {
        setFormData({
          ...formData,
          [name]: [data]
        });
      }
      break;
    default:
      uploadMedia({
        payload: {
          file: files[0],
          id: formData.id
        },
        setProgress
      });
    }
    return true;
  }, [status]);
};

export default useFileUploadService;
