const formBuilderIndividualProps = (
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
      className: 'w-100 m-b-20 col-6',
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      value: formData?.first_name || '',
      validations: {
        required: true
      },
      error: errors?.first_name,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-6',
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      value: formData?.last_name || '',
      validations: {
        required: true
      },
      error: errors?.last_name,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-3',
      name: 'country_code',
      label: 'Code',
      type: 'number',
      value: formData?.country_code || 234,
      validations: {
        required: false,
        maxLength: 4
      },
      error: errors?.country_code,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-9',
      name: 'phone_number',
      label: 'Phone Number',
      type: 'number',
      value: formData?.phone_number || '',
      validations: {
        required: true,
        maxLength: 11
      },
      error: errors?.phone_number,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      type: 'number',
      name: 'bvn',
      label: 'BVN',
      value: formData?.bvn || '',
      validations: {
        max: 11
      },
      error: errors?.bvn,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderIndividualProps;
