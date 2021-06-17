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

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* <Grid container justify="space-around"> */}
        {/*  <KeyboardDatePicker */}
        {/*    disableToolbar */}
        {/*    variant="inline" */}
        {/*    format="MM/dd/yyyy" */}
        {/*    margin="normal" */}
        {/*    id="date-picker-inline" */}
        {/*    label="Date picker inline" */}
        {/*    value={selectedDate} */}
        {/*    onChange={handleDateChange} */}
        {/*    KeyboardButtonProps={{ */}
        {/*      'aria-label': 'change date' */}
        {/*    }} */}
        {/*  /> */}
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label={props.label}
          name={props.name}
          format={props.format}
          value={props.value}
          onChange={handleChange}
          minDate={new Date()}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
        {/*  <KeyboardTimePicker */}
        {/*    margin="normal" */}
        {/*    id="time-picker" */}
        {/*    label="Time picker" */}
        {/*    value={selectedDate} */}
        {/*    onChange={handleDateChange} */}
        {/*    KeyboardButtonProps={{ */}
        {/*      'aria-label': 'change time' */}
        {/*    }} */}
        {/*  /> */}
        {/* </Grid> */}
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
    </div>
  );
};
export default DateInput;
