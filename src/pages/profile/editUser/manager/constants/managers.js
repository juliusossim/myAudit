const formBuilderCorporateManagerProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    btnMethod,
    selectDisabled,
    loading,
    options
  }
) => ([
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'manager',
      label: 'Select Manager',
      value: formData?.manager || '',
      options,
      validations: {
        required: true
      },
      stringValue: true,
      disabled: selectDisabled,
      error: errors?.manager,
      optionIndex: 'account_name',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'phone_number',
      label: 'Phone Number',
      type: 'tel',
      value: formData?.phone_number || '',
      disabled: true,
      error: errors?.phone_number,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderCorporateManagerProps;
