import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { GreenCheckbox, GreenRadioButton } from './checkboxes/CheckboxThemedMat';

export const RadioButtonField = ({
  label, checked, handleChecked, name, className, disabled
}) => (
  <div className={className}>
    <label className="radio-container">
      <input type="radio" name={name} onChange={() => name} className="mr-1" checked={checked} onClick={handleChecked} />
      <span className="radio-checkmark" />
      {label}
    </label>
  </div>
);

export const CheckboxField = ({
  label, checked, handleChecked, name, className
}) => (
  <div className={className}>
    <label className="checkbox-container">
      <input type="checkbox" className="mr-1" name={name} checked={checked} onChange={() => name} onClick={handleChecked} />
      <span className="checkbox-checkmark" />
      {label}
    </label>
  </div>
);
export const Field = ({
  label, className
}) => (
  <Typography className={className}>
    {label}
  </Typography>
);
