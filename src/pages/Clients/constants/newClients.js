import React from 'react';
import { validationPatterns } from '../../../utilities/validation';
import { CheckboxField } from '../../../components/form/inputs/Checkbox';

const newClientProps = (
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
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-8',
      name: 'name',
      type: 'text',
      label: 'Client Name',
      placeholder: 'Enter Client Name',
      value: formData?.name || '',
      validations: {
        required: true
      },
      error: errors?.name,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-4',
      name: 'nature_of_business',
      type: 'text',
      label: 'Business Nature',
      placeholder: 'E.G: Oil Shipment',
      value: formData?.nature_of_business || '',
      validations: {
        required: true
      },
      error: errors?.nature_of_business,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-5',
      name: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: 'Enter Phone Number',
      value: formData?.phone || '',
      validations: {
        original: formData?.phone
      },
      error: errors?.phone,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-7',
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter Email Address',
      value: formData?.email || '',
      validations: {
        required: true,
        pattern: validationPatterns.email
      },
      btn: {
        class: 'ml-18w bg-transparent text-wema',
        text: 'Try Again',
        success: 'Project initialized'
      },
      btnMethod,
      error: errors?.email,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'text_area',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'address',
      type: 'text',
      label: 'Client Address',
      placeholder: 'Enter Company  Address',
      value: formData?.address || '',
      validations: {
        required: true,
        maxLength: 100
      },
      error: errors?.address,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'text_area',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'registered_address',
      type: 'text',
      label: 'Registered Client Address',
      placeholder: 'Registered Address',
      value: formData?.registered_address || '',
      validations: {
        required: true,
        maxLength: 100
      },
      error: errors?.registered_address,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default newClientProps;
