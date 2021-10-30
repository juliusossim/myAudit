/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import TextField from '@material-ui/core/TextField';
import { sentenceCaps } from '../../../utilities/stringOperations';

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
    excuseSkeleton,
    helperText,
    max
  }
) => (
  <div className={`${className}`}>
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
                placeholder={sentenceCaps(placeholder)}
                rows={rows}
                onChange={((e) => {
                  typeof onBlur === 'function'
                  && onBlur(e, validations);
                  onChange(e);
                })}
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
            <TextField
              style={{ width: 'inherit' }}
              label={label}
              multiline
              className={error?.length > 0 ? 'error-field' : ''}
              name={name}
              id={name}
              value={value}
              placeholder={placeholder}
              rows={rows}
              cols={20}
              variant="outlined"
              onChange={onChange}
              onBlur={((e) => typeof onBlur === 'function'
                && onBlur(e, validations))}
              disabled={disabled}
              onKeyPress={onKeyPress}
              onKeyDown={onKeyDown}
              inputProps={{
                maxLength: validations.maxLength
              }}
            />
            <div className="float-right text-wema pr-1">
              {
                validations.maxLength - value.length
              }
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
          </>
        )
    }
  </div>
);

export default TextareaInput;
