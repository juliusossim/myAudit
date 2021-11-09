import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineFileAdd, FiEdit3 } from 'react-icons/all';
import IconButton from '@mui/material/IconButton';
import DragNDropFileInput from '../../../../components/form/inputs/fileInput/DragNDropFileInput';
import useStoreParams from '../../../../components/hooks/useStoreParams';
import { uploadMedia } from '../../../../redux/actions/projectActions';
import { QuillEditorBubble } from '../../../../components/ui/richText';
import { notifier } from '../../../../utilities/stringOperations';

const DragNDropTemp = ({
  formData, setFormData, name, label, setProgress
}) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.engagement.uploads);
  const { status, data, backErrors } = useStoreParams(store);
  const [isFile, setIsFile] = useState(false);
  const handleData = (files) => {
    files.map((file) => dispatch(
      uploadMedia(
        {
          file, setProgress, name
        }
      )
    ));
  };
  useEffect(() => {
    if (status === 'success') {
      setFormData({
        ...formData,
        [data.name]: data.url
      });
    }
  }, [status]);
  return (
    <div className="">
      <label htmlFor={name}>{label}</label>
      <div className={isFile ? '' : 'd-none'}>
        <DragNDropFileInput name={name} handleData={handleData} label={label} />
      </div>
      <div className={isFile ? 'd-none' : ''}>
        <QuillEditorBubble
          setFormData={setFormData}
          name={name}
          formData={formData}
        />
      </div>
      <IconButton className="simple-hover" onClick={() => setIsFile(!isFile)}>
        {isFile
          ? <FiEdit3 className="hover-icon" />
          : <AiOutlineFileAdd className="hover-icon" /> }
        <div className="hover-text">
          {isFile ? 'Compose' : 'Attach File'}
        </div>
      </IconButton>
    </div>
  );
};
export default DragNDropTemp;
