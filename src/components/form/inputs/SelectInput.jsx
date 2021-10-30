/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { stringDoesNotExist } from '../../../utilities/stringOperations';
import Loader from '../../microComponents/loader';

const SelectInput = (
  {
    label,
    name,
    value,
    className,
    onChange,
    onBlur,
    disabled,
    validations,
    error,
    options,
    optionIndex,
    valueIndex,
    titleIndex,
    skeleton,
    excuseSkeleton,
    loading,
    btnMethod,
    btn
  }
) => {
  const optionsProp = options?.map((option) => (
    typeof option === 'object'
      ? (
        <option
          value={Number(option[valueIndex])}
          key={option[optionIndex]}
          title={option[titleIndex]}
        >
          {option[optionIndex].toUpperCase()}
        </option>
      ) : (
        <option
          value={option}
          key={option}
          title={option[titleIndex]}
        >
          {option}
        </option>
      )));
  return (
    <div className={`${className} form-group`}>
      {
        skeleton !== undefined && !skeleton && excuseSkeleton !== name
          ? (
            <Skeleton animation="wave">
              <>
                <label htmlFor={name} className={value?.length ? 'active-field' : ''}>
                  {label}
                </label>
                <select
                  className={error?.length > 0 ? 'error-field' : ''}
                  name={name}
                  id={name}
                  value={value}
                  onChange={onChange}
                  onBlur={((e) => typeof onBlur === 'function'
                  && onBlur(e, validations))}
                  disabled={disabled}
                >
                  {optionsProp}
                </select>
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
                <>
                  {
                    loading === 'failed'
                    && (
                      <button className={btn?.class} type="button" onClick={btnMethod}>
                        {!stringDoesNotExist(value) && btn?.text}
                      </button>
                    )
                  }
                </>
                <>
                  {
                    loading === 'success' && (
                      <button style={{ marginLeft: '16vw' }} className={btn?.class} type="button" onClick={btnMethod}>
                        {btn?.success}
                      </button>
                    )
                  }
                </>
              </label>
              {
                (loading === 'pending')
                  ? <Loader />
                  : (
                    <select
                      className={error?.length > 0 ? 'error-field' : ''}
                      name={name}
                      id={name}
                      value={value}
                      onChange={((e) => {
                        typeof onBlur === 'function'
                        && onBlur(e, validations);
                        onChange(e);
                      })}
                      onBlur={((e) => typeof onBlur === 'function'
                        && onBlur(e, validations))}
                      disabled={disabled}
                    >
                      {optionsProp}
                    </select>
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
            </>
          )
      }
    </div>
  );
};

export default SelectInput;
