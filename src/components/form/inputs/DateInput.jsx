import 'date-fns';
import addMonths from 'date-fns/addMonths';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker, DatePicker
} from '@material-ui/pickers';
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/all';
import Skeleton from '@material-ui/lab/Skeleton';
import { capitalize } from '@material-ui/core';

const DateInput = (props) => {
  const [show, setShow] = React.useState(true);
  const handleChange = (date) => {
    props.onChange({ date, name: props.name });
    setShow(false);
  };
  return (
    <div className={props.error?.length > 0 ? `${props.className} col-12` : props.className}>
      {
        props.skeleton !== undefined && !props.skeleton && props.excuseSkeleton !== props.name
          ? (
            <Skeleton animation="wave">
              <>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    autoOk
                    // minDate={props.value}
                    // variant="inline"
                    // openTo="date"
                    // margin="normal"
                    id="date-picker-dialog"
                    label={props.label}
                    name={props.name}
                    format="MM/dd/yyyy"
                    value={props.value}
                    helperText={props.helperText}
                    onChange={handleChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
                {
                  props.error?.length > 0
                && (
                  <ul className="error-msg">
                    {
                      props.error.map(
                        (error) => <li key={error}>{error}</li>
                      )
                    }
                  </ul>
                )
                }
              </>
            </Skeleton>
          )
          : (
            <>
              {props.variant === 'static'
              && (
                <label htmlFor={props.name} className={props.value?.length ? 'active-field' : ''}>
                  {capitalize(props.label)}
                </label>
              ) }
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  margin="normal"
                  variant={props.variant}
                  id="date-picker-dialog"
                  label={props.label}
                  name={props.name}
                  format={props.format || 'dd/MM/yyyy'}
                  value={props.value}
                  helperText={show && props.helperText}
                  onChange={handleChange}
                  maxDate={addMonths(new Date(), 3)}
                  minDate={new Date(props.minDate)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
              {
                props.error?.length > 0
                && (
                  <ul className="error-msg">
                    {
                      props.error.map(
                        (error) => <li key={error}>{error}</li>
                      )
                    }
                  </ul>
                )
              }
            </>
          )
      }
    </div>
  );
};
export default DateInput;
