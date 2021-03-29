/* eslint-disable react/destructuring-assignment */
import React from 'react';

const SelectInput = (props) => {
  const error = props.error === 'Required' ? null : props.error;
  const options = props?.options?.map((option) => (
    typeof option === 'object'
      ? (
        <option
          value={option?.value?.toString()?.toLowerCase() === 'select item...' ? '' : option.value}
          key={option.name}
        >
          {option.name}
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
    <div className={`${props.className} form-group`}>
      <label htmlFor={props.name} className={props?.value?.length ? 'active-field' : ''}>
        {props.label}
      </label>
      <select
        className={error && 'error-field'}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
      >
        {options}
      </select>
      {error ? <p className="error-msg">{error}</p> : null}
    </div>
  );
};

export default SelectInput;
