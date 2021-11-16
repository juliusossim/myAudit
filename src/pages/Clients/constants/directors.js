import React from 'react';
import { designations } from '../../../utilities/dummyData';

const newClientProps1 = (
  {
    formData,
    handleBlur,
    handleChange,
    errors
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'director_name_alt',
      type: 'text',
      label: 'Director Name',
      placeholder: 'Enter Director Name',
      value: formData?.director_name_alt || '',
      validations: {
        required: true
      },
      error: errors?.director_name_alt,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'director_units_held_alt',
      metaName: 'direct',
      meta: { name: 'director_units_held', kind: 'array' },
      type: 'number',
      label: 'Director Shares (%)',
      placeholder: 'Enter Director\'s shares units in percentage',
      value: formData?.director_units_held_alt || '',
      validations: {
        required: true
      },
      error: errors?.director_units_held_alt,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-md-6 col-12',
      name: 'director_designation_alt',
      meta: { name: 'director_designation', kind: 'array' },
      label: 'Directors Designation',
      value: formData?.director_designation_alt || '',
      options: designations,
      error: errors?.director_designation_alt,
      optionIndex: 'type',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default newClientProps1;
