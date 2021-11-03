/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { FaPlus } from 'react-icons/all';
import ProgressBar from '../../microComponents/circularProgress';
import Loader from '../../microComponents/loader';
import {
  DragAndDropUploader,
  ImageWrapper,
  ProgressWrapper
} from '../../temps/projectTemps/miscTemps';

const FileInput = (
  {
    label,
    className,
    setFormData,
    text,
    accepted,
    name,
    value,
    file,
    multiple,
    removeItem,
    progress,
    onChange,
    onBlur,
    validations,
    error,
    loading,
    uploads
  }
) => {
  const data = [...new Set(file)];
  return (
    <div className={`${className} form-group`}>
      <>
        <p className="theme-font text-theme-black">
          {label}
        </p>
        <DragAndDropUploader handleDrop={onChange} uploads={uploads} />
        <div className={multiple ? 'row p-3' : 'd-none'}>
          {
            data.map((upload, key) => (
              <div className="col-md-4" key={JSON.stringify(upload?.uri)}>
                <div className={loading === 'initial' ? '' : 'd-none'}>
                  <ImageWrapper removeItem={removeItem} upload={upload} />
                </div>
                {
                  (key + 1) < data.length && loading !== 'initial'
                    ? <ImageWrapper removeItem={removeItem} upload={upload} />
                    : (
                      <div className={progress > 0 ? '' : 'd-none'}>
                        {
                          (progress < 100 && (key + 1) === data.length)
                            ? <ProgressWrapper progress={progress} />
                            : (
                              <div>
                                <div className={loading === 'pending' && (key + 1) === data.length ? '' : 'd-none'}>
                                  <Loader />
                                </div>
                                <div className={loading === 'pending' && (key + 1) === data.length ? 'd-none' : ''}>
                                  <div className={loading === 'success' && (key + 1) === data.length ? '' : 'd-none'}>
                                    <ImageWrapper removeItem={removeItem} upload={upload} />
                                  </div>
                                </div>
                              </div>
                            )

                        }
                      </div>
                    )
                }
              </div>
            ))
          }
          <div className="">
            <div className="file-input col-md-4">

              <button type="button" className="mt-2 btn w-100">
                <small>{`Upload ${label} `}</small>
              </button>

              <input
                className={error?.length > 0 ? 'error-field' : ''}
                type="file"
                value={value || ''}
                name={name}
                multiple
                onBlur={((e) => typeof onBlur === 'function'
                 && onBlur(e, validations))}
                onChange={onChange}
              />
            </div>
          </div>

        </div>

        <div className={multiple ? 'd-none' : ''}>
          <div className="file-input">
            <p>
              {label}
            </p>
            <button type="button">
              { file.length === 0 ? text : 'Replace Upload' }
              {' '}
            </button>
            <input
              style={
                {
                  marginTop: '6vh',
                  paddingBottom: '5vh'
                }
              }
              className={error?.length > 0 ? 'error-field' : ''}
              type="file"
              value={value}
              name={name}
              onBlur={((e) => typeof onBlur === 'function'
                          && onBlur(e, validations))}
              onChange={onChange}
            />

            <div className={progress > 0 ? '' : 'd-none'}>

              <ProgressBar
                className={progress < 100 ? '' : 'd-none'}
                progress={progress}
                size={200}
                strokeWidth={15}
                circleOneStroke="#f1ecf3b0"
                circleTwoStroke="#A01B88"
              />

              <div className={progress >= 100 ? '' : 'd-none'}>
                <div className={file.length > 0 ? '' : 'd-none'}>
                  <img src={file} alt="inserted library" className="h-7h" />
                  <button type="button" className="btn btn-small float-sm-right w-25 text-danger" onClick={setFormData}>Cancel</button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {
          error?.length > 0
            ? (
              <ul className="error-msg">
                {
                  error.map(
                    (err, index) => <li key={`${err}`}>{err}</li>
                  )
                }
              </ul>
            )
            : null
        }
      </>
      <div className="text-theme ml-2">
        <small>Accepted Type:</small>
        <small className="ml-1">{accepted || 'jpeg, jpg, mp4, ogg, etc. (1MB max).'}</small>
      </div>
    </div>
  );
};

export default FileInput;
