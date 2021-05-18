/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { FaEyeSlash, FaEye, FaCheck } from 'react-icons/all';
import {
  containSpecialChars,
  containCaps,
  containNums,
  containSmallCaps,
  eightOrLonger,
  validatePassword
} from '../../../utilities/validation';

const TextInput = (props) => {
  const [reveal, setReveal] = useState(false);
  const handleReveal = () => setReveal(!reveal);

  return (
    <div className={`${props.error?.length > 0 ? `${props.className} col-12` : `${props.className}`} form-group`}>
      <label htmlFor={props.name} className={String(props.value).length ? 'active-field' : ''}>
        {props.label}
        <span className="text-danger font-weight-bold">{props.validations?.required && '*'}</span>
      </label>
      <input
        className={props.error?.length > 0 ? 'error-field' : ''}
        type={reveal ? 'text' : props.type || 'text'}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        title={props.title}
        readOnly={props.readOnly}
        onBlur={((e) => typeof props.onBlur === 'function'
        && props.onBlur(e, props.validations))}
        disabled={props.disabled}
        required={props.validations?.required}
        onKeyPress={props.onKeyPress}
        onKeyDown={props.onKeyDown}
        maxLength={props.validations?.maxLength}
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
          : props.name === 'password' && props.value !== ''
        && validatePassword(props.value) && (
            reveal ? <FaEyeSlash title="hide" role="button" className="end-icon" onClick={handleReveal} />
              : <FaEye title="reveal" role="button" className="end-icon" onClick={handleReveal} />
          )
      }
      {
        props.type === 'password' && props.validations?.pattern && props.value !== '' && (
          <div className={validatePassword(props.value) ? 'd-none' : undefined}>

            <div className="row">
              Password must contain at least
            </div>
            <ul className="">
              <li className={containSmallCaps(props.value) ? 'text-success ' : 'text-muted '}>
                a small letter
                {' '}
                { containSmallCaps(props.value) && <FaCheck />}
              </li>

              <li className={containCaps(props.value) ? 'text-success ' : 'text-muted '}>
                a capital letter
                {' '}
                { containCaps(props.value) && <FaCheck />}
              </li>
              <li className={containSpecialChars(props.value) ? 'text-success ' : 'text-muted '}>
                a special character
                {' '}
                { containSpecialChars(props.value) && <FaCheck />}
              </li>

              <li className={containNums(props.value) ? 'text-success ' : 'text-muted '}>
                a number
                {' '}
                { containNums(props.value) && <FaCheck />}
              </li>
              <li className={eightOrLonger(props.value) ? 'text-success ' : 'text-muted '}>
                eight (8) characters
                {' '}
                { eightOrLonger(props.value) && <FaCheck />}
              </li>
            </ul>
          </div>
        )
      }
    </div>
  );
};

export default TextInput;
