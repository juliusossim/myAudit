import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { accountingStandards, auditingStandards } from '../../../utilities/dummyData';

const sliderProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    name,
    placeholder
  }
) => ([
  {
    kind: 'currency',
    props: {
      className: 'w-100 m-b-20 col-12',
      name,
      label: 'Amount',
      type: 'text',
      value: formData[name],
      validations: {
        required: true
      },
      error: errors[name],
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default sliderProps;
