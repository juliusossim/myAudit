/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { FaPlus } from 'react-icons/all';
import ProgressBar from '../../microComponents/circularProgress';

const FileInput = (
  {
    label,
    className,
    setFormData,
    text,
    name,
    value,
    file,
    multiple,
    removeItem,
    progress,
    onChange,
    onBlur,
    validations,
    error
  }
) => (
  <div className={`${error?.length > 0 ? `${className} col-12` : `${className}`} form-group`}>
    {
      multiple ? (
        <div className="row border p-3">

          {
            file.map((upload) => (
              <div className="col-md-4">
                <img src={URL.createObjectURL(upload)} alt={upload} />
                <button onClick={() => removeItem(upload)} type="button" className="text-white btn-sm btn-danger radius50  remove-media">x</button>
              </div>
            ))
          }
          <div className="file-input col-md-4">
            <button type="button" className="">
              <div className=""><FaPlus /></div>
              <small> Add Media</small>
            </button>
            <input
              className={error?.length > 0 ? 'error-field' : ''}
              type="file"
              value={value}
              name={name}
              multiple
              onBlur={((e) => typeof onBlur === 'function'
                    && onBlur(e, validations))}
              onChange={onChange}
            />
          </div>
        </div>
      )
        : (
          <div>
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
              {
                progress > 0 && (
                  <div>
                    {
                      progress < 100 ? (
                        <ProgressBar
                          progress={progress}
                          size={200}
                          strokeWidth={15}
                          circleOneStroke="#f1ecf3b0"
                          circleTwoStroke="#A01B88"
                        />
                      )
                        : file.length > 0 && (
                          (
                            <div>
                              <img src={file} alt="inserted image" />
                              <button type="button" className="btn btn-small float-sm-right w-25 text-danger" onClick={setFormData}>Cancel</button>
                            </div>
                          )
                        )
                    }
                  </div>
                )
              }
            </div>
          </div>
        )
    }

    {
      error?.length > 0
        ? (
          <ul className="error-msg">
            {
              error.map(
                (err) => <li key={err}>{err}</li>
              )
            }
          </ul>
        )
        : null
    }
  </div>
);

export default FileInput;
