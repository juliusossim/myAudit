import 'date-fns';
import addMonths from 'date-fns/addMonths';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker, DatePicker
} from '@material-ui/pickers';
import Skeleton from '@material-ui/lab/Skeleton';
import { capitalize } from '@material-ui/core';

const DateInput = (props) => {
  const {
    className, skeleton, excuseSkeleton, helperText, minDate, label,
    onChange, variant, name, error, value, format
  } = props;
  const [show, setShow] = React.useState(true);
  const handleChange = (date) => {
    onChange({ date, name });
    setShow(false);
  };

  return (
    <div className={error?.length > 0 ? `${className} col-12` : className}>
      {
        skeleton !== undefined && !skeleton && excuseSkeleton !== name
          ? (
            <Skeleton animation="wave">
              <>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    autoOk
                    // minDate={value}
                    // variant="inline"
                    // openTo="date"
                    // margin="normal"
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
                </MuiPickersUtilsProvider>
                {
                  error?.length > 0
                  && (
                    <ul className="error-msg">
                      {
                        error.map(
                          (err) => <li key={err}>{err}</li>
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
              {variant === 'static'
              && (
                <label htmlFor={name} className={value?.length ? 'active-field' : ''}>
                  {capitalize(label)}
                </label>
              ) }
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  margin="normal"
                  variant={variant}
                  id="date-picker-dialog"
                  label={label}
                  name={name}
                  openTo="year"
                  format={format || 'yyyy'}
                  value={value}
                  helperText={show && helperText}
                  onChange={handleChange}
                  maxDate={addMonths(new Date(), 3)}
                  minDate={new Date(minDate)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
              {
                error?.length > 0
                && (
                  <ul className="error-msg">
                    {
                      error.map(
                        (err) => <li key={error}>{err}</li>
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
