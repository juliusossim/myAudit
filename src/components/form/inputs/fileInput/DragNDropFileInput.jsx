/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import Dropzone from 'react-dropzone';

const DragNDropFileInput = ({ handleData, label }) => {
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
                  ? <p>{`Drag n drop or click to select ${label}`}</p>
                  : (
                    <ul>
                      {fileNames.map((fileName) => (
                        <li key={fileName}>{fileName}</li>
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
