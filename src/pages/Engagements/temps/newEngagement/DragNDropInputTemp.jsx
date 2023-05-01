import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isFunction } from 'lodash';
import { AiOutlineFileAdd, FiEdit3 } from 'react-icons/all';
import IconButton from '@mui/material/IconButton';
import DragNDropFileInput from '../../../../components/form/inputs/fileInput/DragNDropFileInput';
import useStoreParams from '../../../../components/hooks/useStoreParams';
import { uploadMedia } from '../../../../redux/actions/projectActions';
import { QuillEditorBubble } from '../../../../components/ui/richText';
import { notifier } from '../../../../utilities/stringOperations';
import useCreateBoilerPlate from '../../../../components/hooks/useCreateBoilerPlate';
import { apiOptions } from '../../../../services/fetch';
import useUpdateStore from '../../../../components/hooks/useUpdateStore';
import useFetchData from '../../../../components/hooks/useFetchData';

const DragNDropTemp = ({
  formData, setFormData, name, label, setErrors, handleBlur
}) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.engagement?.uploads);

  const [isFile, setIsFile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [fileUrl, setFileUrl] = useState({});

  // const engagementStore = useSelector((state) => state.engagement.engagement);
  const pushUpdates = useUpdateStore;
  const fetchData = useFetchData;

  const {
    status, data, backErrors, message
  } = useStoreParams(store);
  const uploadMediaFail = () => {
    setUploaded(false);
    setErrors(backErrors);
    // pushUpdates([
    //   {
    //     data,
    //     action: 'UPLOAD_MEDIA_COMPLETE'
    //   }
    // ], dispatch);
    // return notifier({
    //   title: 'Download Failed',
    //   text: message,
    //   type: 'info'
    // });
  };

  const uploadMediaSuccess = () => {
    setUploaded(true);
    setFormData({
      ...formData,
      [data.name]: data.url
    });
    isFunction(handleBlur) && handleBlur();
  };

  useEffect(() => {
    switch (status) {
    case 'failed':
      return uploadMediaFail();
    case 'success':
      return uploadMediaSuccess();
    default:
      setUploaded(false);
    }
    return status;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleData = (files) => {
    files.map((file) => dispatch(
      uploadMedia(
        {
          file, setProgress, name
        }
      )
    ));
  };

  // fetchData({
  //   successCallback: uploadMediaSuccess,
  //   failCallback: uploadMediaFail,
  //   store
  // });

  return (
    <div className="">
      <label htmlFor={name}>{label}</label>
      <div className={isFile ? '' : 'd-none'}>
        <DragNDropFileInput
          name={name}
          handleData={handleData}
          label={label}
          uploaded={status}
        />
      </div>
      <div className={isFile ? 'd-none' : ''}>
        <QuillEditorBubble
          setFormData={setFormData}
          name={name}
          formData={formData}
          handleBlur={handleBlur}
        />
      </div>
      <button type="button" className="simple-hover button" onClick={() => setIsFile(!isFile)}>
        {isFile
          ? <FiEdit3 className="hover-icon" />
          : <AiOutlineFileAdd className="hover-icon" /> }
        <div className="hover-text">
          {isFile ? 'Compose' : 'Attach File'}
        </div>
      </button>
    </div>
  );
};
export default DragNDropTemp;
