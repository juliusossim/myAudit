/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import Dropzone from 'react-dropzone';
import { AiOutlineCheck, AiOutlineFileAdd } from 'react-icons/all';
import IconButton from '@mui/material/IconButton';
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
                        <IconButton>
                          <AiOutlineFileAdd className="font-black font-title-small" />
                        </IconButton>
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
                          <span>{uploaded && animatedCheck}</span>
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
