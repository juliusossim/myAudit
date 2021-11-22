import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { accountingStandards, auditingStandards, auditPost } from '../../../utilities/dummyData';

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
      label: 'Select Team Member',
      value: formData?.user_id || '',
      options: formData.users,
      validations: {
        required: true
      },
      error: errors?.user_id,
      optionIndex: 'name',
      valueIndex: 'id',
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'engagement_team_role_id',
      label: 'Assign Role',
      value: formData?.engagement_team_role_id || '',
      options: auditPost,
      validations: {
        required: true
      },
      error: errors?.engagement_team_role_id,
      optionIndex: 'type',
      valueIndex: 'id',
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default userProps;
