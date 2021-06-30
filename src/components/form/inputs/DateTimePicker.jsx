import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardDatePicker, DatePicker
} from '@material-ui/pickers';

const MatDatetimPickers = ({
  name,
  initDatetime,
  type,
  onChange,
  label,
  value,
  helperText,
  ampm
}) => {
  const handleChange = (date) => onChange({ date, name });

  if (type !== 'time') {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* <Grid container justify="space-around"> */}
        <KeyboardDatePicker
          autoOk
          minDate={value}
          variant="inline"
          openTo="date"
          margin="normal"
          id="date-picker-dialog"
          label={label}
          name={name}
          format="MM/dd/yyyy"
          value={value}
          helperText={helperText}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
        {/* </Grid> */}
      </MuiPickersUtilsProvider>
    );
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <TimePicker
          name={name}
          margin="normal"
          value={initDatetime}
          ampm={ampm !== false}
          format="hh:mm"
          id="time-picker"
          label={label || ''}
          onChange={(date) => onChange({ value: date, name })}
          KeyboardButtonProps={{
            'aria-label': 'change time'
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
export default MatDatetimPickers;
