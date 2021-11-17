import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { accountingStandards, auditingStandards } from '../../../utilities/dummyData';

const userProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors
  }
) => ([
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'user_id',
      label: 'Select Auditing Standard',
      value: formData?.user_id || '',
      options: formData.users,
      validations: {
        required: true
      },
      error: errors?.user_id,
      optionIndex: 'full_name',
      valueIndex: 'id',
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default userProps;
