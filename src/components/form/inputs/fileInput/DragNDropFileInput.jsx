/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import Dropzone from 'react-dropzone';
import { AiOutlineFileAdd, MdErrorOutline } from 'react-icons/all';
import CircularProgress from '@material-ui/core/CircularProgress';
import { animatedCheck } from '../../../temps/projectTemps/miscTemps';

const DragNDropFileInput = ({ handleData, label, uploaded }) => {
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = (acceptedFiles) => {
    setFileNames(acceptedFiles.map((file) => file.name));
    handleData(acceptedFiles);
  };

  return (
    <div className="">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div>
              {
                isEmpty(fileNames)
                  ? (
                    <div className="font-regular">
                      <p>
                        <button type="button" className="btn-plain">
                          <AiOutlineFileAdd className="font-black font-title-small" />
                        </button>
                      </p>
                      <span>Drop or</span>
                      <button type="button" className="bold bg-transparent mx-1 font-black">browse</button>
                      <span className="">{label}</span>
                      <p>
                        <small>supports: .pdf, docs, jpg, jpeg</small>
                      </p>
                    </div>
                  )
                  : (
                    <ul>
                      {fileNames.map((fileName) => (
                        <li key={fileName}>
                          <span>{fileName}</span>
                          <span>{uploaded === 'success' && animatedCheck(<path className="path" d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />)}</span>
                          <span>{uploaded === 'failed' && <MdErrorOutline className="text-danger" />}</span>
                          <span>{uploaded === 'pending' && <CircularProgress />}</span>
                        </li>
                      ))}
                    </ul>
                  )
              }
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};
export default DragNDropFileInput;
