/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { FaEyeSlash, FaEye, FaCheck } from 'react-icons/all';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  containSpecialChars,
  containCaps,
  containNums,
  containSmallCaps,
  eightOrLonger,
  validatePassword
} from '../../../utilities/validation';
import { stringDoesNotExist } from '../../../utilities/stringOperations';
import Loader from '../../microComponents/loader';

const TextInput = (props) => {
  const [reveal, setReveal] = useState(false);
  const [helper, setHelper] = useState(false);
  const handleReveal = () => setReveal(!reveal);
  const loading = typeof props.loading === 'string'
    ? props.loading : props.loading?.status;
  const handleHelperText = () => {
    setHelper(true);
  };
  const mouseOut = () => {
    setHelper(false);
  };

  return (
    <div className={`${props.className} form-group`}>
      {
        props.skeleton !== undefined && !props.skeleton && props.excuseSkeleton !== props.name
          ? (
            <div>
              (
              <Skeleton animation="wave">
                <input
                  className={props.error?.length > 0 ? 'error-field' : ''}
                  type={reveal ? 'text' : props.type || 'text'}
                  name={props.name}
                  id={props.name}
                  value={props.type === 'number' ? props.value.toLocaleString() : props.value}
                  onChange={props.onChange}
                  onFocus={props.onFocus}
                  placeholder={props.placeholder}
                  title={props.title}
                  readOnly={props.readOnly}
                  onMouseEnter={handleHelperText}
                  onMouseLeave={mouseOut}
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
              </Skeleton>
              )
            </div>
          )
          : (
            <>
              <label htmlFor={props.name} className={String(props.value).length ? 'active-field' : ''}>
                {props.label}
                <span className="text-danger font-weight-bold">{props.validations?.required && '*'}</span>

                <>
                  {
                    loading === 'failed'
                  && (
                    <button className={props.btn?.class} type="button" onClick={props.btnMethod}>
                      {!stringDoesNotExist(props.value) && props.btn?.text}
                    </button>
                  )
                  }
                </>
                <>
                  {
                    loading === 'success' && (
                      <button style={{ marginLeft: '16vw' }} className={props.btn?.class} type="button" onClick={props.btnMethod}>
                        {props.btn?.success}
                      </button>
                    )
                  }
                </>

              </label>
              {
                (loading === 'pending')
                  ? <Loader />
                  : (
                    <input
                      className={props.error?.length > 0 ? 'error-field' : ''}
                      type={reveal ? 'text' : props.type || 'text'}
                      name={props.name}
                      id={props.name}
                      value={props.type === 'number' ? props.value.toLocaleString() : props.value}
                      onChange={props.onChange}
                      onFocus={props.onFocus}
                      placeholder={props.placeholder}
                      title={props.title}
                      readOnly={props.readOnly}
                      onMouseEnter={handleHelperText}
                      onMouseLeave={mouseOut}
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
                  )
              }
              {
                helper && props.value && <div className="text-wema">{ props.helperText}</div>
              }
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
              {console.log(props.hidePasswordValidations)}
              <div className={props.hidePasswordValidations ? 'd-none' : ''}>
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

            </>
          )
      }

    </div>
  );
};

export default TextInput;
