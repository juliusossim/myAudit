/* eslint-disable react/destructuring-assignment */
import React from 'react';

const TextareaInput = (props) => {
  const error = props.error === 'Required' ? null : props.error;
  return (
    <div className={`${props?.className} form-group`}>
      <label htmlFor={props.name} className={props?.value?.length ? 'active-field' : ''}>
        {props.label}
      </label>
      <textarea
        className={error && 'error-field'}
        name={props.name}
        id={props.name}
        value={props.value}
        rows={props.rows}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        onKeyPress={props.onKeyPress}
        onKeyDown={props.onKeyDown}
      />
      {error ? <p className="error-msg">{error}</p> : null}
    </div>
  );
};

export default TextareaInput;
