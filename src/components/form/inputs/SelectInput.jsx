/* eslint-disable react/destructuring-assignment */
import React from 'react';

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
    optionIndex
  }
) => {
  const optionsProp = options?.map((option) => (
    typeof option === 'object'
      ? (
        <option
          value={option[optionIndex]?.toString()?.toLowerCase() === 'select item...' ? '' : option[optionIndex]}
          key={option[optionIndex]}
        >
          {option[optionIndex].toUpperCase()}
        </option>
      ) : (
        <option
          value={option?.toString()?.toLowerCase() === 'select item...' ? '' : option}
          key={option}
        >
          {option}
        </option>
      )));
  return (
    <div className={`${error?.length > 0 ? `${className} col-12` : `${className}`} form-group`}>
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
    </div>
  );
};

export default SelectInput;
