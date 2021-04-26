/* eslint-disable react/destructuring-assignment */
import React from 'react';

const TextInput = (props) => (
  <div className={`${props.error?.length > 0 ? `${props.className} col-12` : `${props.className}`} form-group`}>
    <label htmlFor={props.name} className={String(props.value).length ? 'active-field' : ''}>
      {props.label}
    </label>
    <input
      className={props.error?.length > 0 ? 'error-field' : ''}
      type={props.type || 'text'}
      name={props.name}
      id={props.name}
      value={props.value}
      onChange={props.onChange}
      readOnly={props.readOnly}
      onBlur={((e) => typeof props.onBlur === 'function'
        && props.onBlur(e, props.validations))}
      disabled={props.disabled}
      onKeyPress={props.onKeyPress}
      onKeyDown={props.onKeyDown}
      maxLength={props.validations?.max}
      min={props.validations?.min}
      max={props.validations?.max}
    />
    {
      props.error?.length > 0
        ? (
          <ul className="error-msg">
            {
              props.error.map(
                (error) => <li key={error}>{error}</li>
              )
            }
          </ul>
        )
        : null
    }
  </div>
);

export default TextInput;
