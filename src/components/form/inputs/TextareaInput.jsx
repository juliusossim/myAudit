/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const TextareaInput = (
  {
    name,
    value,
    label,
    rows,
    className,
    error,
    onChange,
    onBlur,
    onKeyDown,
    onKeyPress,
    disabled,
    placeholder,
    validations,
    skeleton,
    excuseSkeleton
  }
) => (
  <div className={`${error?.length > 0 ? `${className} col-12` : `${className}`} form-group`}>
    {
      skeleton !== undefined && !skeleton && excuseSkeleton !== name
        ? (
          <Skeleton animation="wave">
            <>
              <label htmlFor={name} className={value?.length ? 'active-field' : ''}>
                {label}
              </label>
              <textarea
                className={error?.length > 0 ? 'error-field' : ''}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                rows={rows}
                onChange={onChange}
                onBlur={((e) => typeof onBlur === 'function'
                && onBlur(e, validations))}
                disabled={disabled}
                onKeyPress={onKeyPress}
                onKeyDown={onKeyDown}
              />
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
            </>
          </Skeleton>
        )
        : (
          <>
            <label htmlFor={name} className={value?.length ? 'active-field' : ''}>
              {label}
            </label>
            <textarea
              className={error?.length > 0 ? 'error-field' : ''}
              name={name}
              id={name}
              value={value}
              placeholder={placeholder}
              rows={rows}
              onChange={onChange}
              onBlur={((e) => typeof onBlur === 'function'
                && onBlur(e, validations))}
              disabled={disabled}
              onKeyPress={onKeyPress}
              onKeyDown={onKeyDown}
            />
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
          </>
        )
    }
  </div>
);

export default TextareaInput;
