import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/all';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  containCaps,
  containNums,
  containSmallCaps,
  containSpecialChars, eightOrLonger,
  validatePassword
} from '../../../utilities/validation';

const DateInput = (props) => {
  const handleChange = (date) => props.onChange({ date, name: props.name });
  return (
    <div className={props.error?.length > 0 ? `${props.className} col-12` : props.className}>
      {
        props.skeleton !== undefined && !props.skeleton && props.excuseSkeleton !== props.name
          ? (
            <Skeleton animation="wave">
              <>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label={props.label}
                    name={props.name}
                    format={props.format || 'dd-mm-yyyy'}
                    value={props.value}
                    helperText={props.helperText}
                    onChange={handleChange}
                    minDate={new Date()}
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label={props.label}
                  name={props.name}
                  format={props.format || 'dd-mm-yyyy'}
                  value={props.value}
                  helperText={props.helperText}
                  onChange={handleChange}
                  minDate={new Date()}
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
