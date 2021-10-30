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
      label: 'Company Name',
      placeholder: 'Enter Company Name',
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
      name: 'registered_address',
      type: 'text',
      label: 'Company Address',
      placeholder: 'Enter Company Registered  Address',
      value: formData?.registered_address || '',
      validations: {
        required: true,
        maxLength: 100
      },
      error: errors?.registered_address,
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
      label: 'Alternative Address',
      placeholder: 'Second Address',
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
    kind: 'tags',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'director_name',
      type: 'text',
      label: 'Director Name',
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
  },
  {
    kind: 'custom',
    props: {
      element: <CheckboxField
        label="It's a Public Company"
        name="is_public_entity"
        handleChecked={handleChecked}
        className="w-100 m-b-20 col-12 col-md-6"
        checked={formData?.is_public_entity}
      />
    }
  },
  {
    kind: 'custom',
    props: {
      element: <CheckboxField
        label="It's part of a group"
        name="is_part_of_group"
        handleChecked={handleChecked}
        className="w-100 m-b-20 col-12 col-md-6"
        checked={formData?.is_part_of_group}
      />
    }
  },
  {
    kind: 'tags',
    props: {
      className: formData?.is_part_of_group ? 'w-100 m-b-20 col-12' : 'd-none',
      name: 'subsidiary_name',
      type: 'text',
      label: 'Subsidiary Name',
      placeholder: 'Enter Subsidiary Name',
      formData,
      setFormData
    }
  },
  {
    kind: 'tags',
    props: {
      className: formData?.is_part_of_group ? ' w-100 m-b-20 col-12 ' : 'd-none',
      name: 'subsidiary_nature_of_business',
      type: 'text',
      label: 'Subsidiary Business Nature',
      placeholder: 'E.G: Housing',
      formData,
      setFormData
    }
  },
  {
    kind: 'tags',
    props: {
      className: formData?.is_part_of_group ? ' w-100 m-b-20 col-12 col-md-6 ' : 'd-none',
      name: 'subsidiary_nature',
      type: 'text',
      label: 'Subsidiary Nature',
      placeholder: 'E.G: LTD',
      formData,
      setFormData
    }
  },
  {
    kind: 'tags',
    props: {
      className: formData?.is_part_of_group ? 'w-100 m-b-20 col-12 col-md-6 ' : 'd-none',
      name: 'subsidiary_percentage_holding',
      type: 'number',
      label: 'Subsidiary Percentage Holding',
      placeholder: 'E.G: 5%',
      formData,
      setFormData
    }
  }
]);
export default newClientProps;
