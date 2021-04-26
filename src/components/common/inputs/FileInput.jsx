/* eslint-disable react/destructuring-assignment */
import React from 'react';

const FileInput = (
  {
    label,
    className,
    text,
    name,
    value,
    onChange,
    onBlur,
    validations,
    error
  }
) => (
  <div className={`${error?.length > 0 ? `${className} col-12` : `${className}`} form-group`}>
    <div className="file-input">
      <p>
        {label}
      </p>
      <button type="button">{text}</button>
      <input
        className={error?.length > 0 ? 'error-field' : ''}
        type="file"
        value={value}
        name={name}
        onBlur={((e) => typeof onBlur === 'function'
          && onBlur(e, validations))}
        onChange={onChange}
      />
    </div>
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
