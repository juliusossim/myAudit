/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';

import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const CalendarInput = (props) => {
  const [reveal, setReveal] = useState(false);
  const handleReveal = () => setReveal(!reveal);

  return (
    <div className={`${props.error?.length > 0 ? `${props.className} col-12` : `${props.className}`} form-group`}>
      <label htmlFor={props.name} className={String(props.value).length ? 'active-field' : ''}>
        {props.label}
        <span className="text-danger font-weight-bold">{props.validations?.required && '*'}</span>
        {
          props.btn?.constructor === Object && props.loading === 'failed'
          && (
            <button className={props.btn?.class} type="button" onClick={props.btnMethod}>
              {props.btn?.text}
            </button>
          )

        }
      </label>
      {
        props.loading === 'pending'
          ? (
            <div className="dots_loader d-flex">
              <p className="mr-md-1 pb-md-1"> fetching your details</p>
              <div className="mt-md-1">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          )
          : (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                autoOk
                minDate={new Date()}
                variant="static"
                openTo="date"
                name={props.name}
                placeholder={props.placeholder}
                clearable={props.clearable}
                value={props.value || new Date()}
                onChange={props.onChange}
                disablePast={props.disablePast}
                onFocus={props.onFocus}
                title={props.title}
                readOnly={props.readOnly}
                onBlur={((e) => typeof props.onBlur === 'function'
                  && props.onBlur(e, props.validations))}
                disabled={props.disabled}
                required={props.validations?.required}
                onKeyPress={props.onKeyPress}
                onKeyDown={props.onKeyDown}

              />
            </MuiPickersUtilsProvider>
          )
      }
    </div>
  );
};

export default CalendarInput;
