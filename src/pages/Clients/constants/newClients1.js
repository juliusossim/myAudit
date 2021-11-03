import React from 'react';
import { validationPatterns } from '../../../utilities/validation';
import { CheckboxField } from '../../../components/form/inputs/Checkbox';

const newClientProps1 = (
  {
    formData,
    setFormData,
    handleBlur,
    handleChange,
    errors,
    btnMethod,
    handleChecked
  }
) => ([
  {
    kind: 'tags',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'director_name',
      type: 'text',
      label: 'List Of Directors Name',
      helperText: 'Enter each name separated by a comma (,)',
      placeholder: 'Directors\' Full Names',
      formData,
      setFormData
    }
  },
  {
    kind: 'tags',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'director_units_held',
      type: 'number',
      label: 'Director\'s Units (%)',
      placeholder: 'Director\'s Company Shares',
      formData,
      setFormData
    }
  },
  {
    kind: 'tags',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'director_designation',
      type: 'text',
      label: 'Directors\' Designations',
      placeholder: 'Directors\' Designations',
      formData,
      setFormData
    }
  },
  {
    kind: 'text_area',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'doubts',
      type: 'text',
      label: 'Doubts',
      placeholder: 'State your doubts',
      value: formData?.doubts || '',
      validations: {
        required: true,
        maxLength: 100
      },
      error: errors?.doubts,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default newClientProps1;
