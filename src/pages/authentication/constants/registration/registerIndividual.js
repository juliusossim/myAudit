const formBuilderIndividualProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    btnMethod,
    loading
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 ',
      name: 'account_number',
      label: 'Account Number',
      type: 'number',
      value: formData?.account_number || '',
      validations: {
        required: true,
        maxLength: 10
      },
      loading,
      btn: {
        class: 'ml-18w bg-transparent text-wema',
        text: 'Verify'
      },
      btnMethod,
      error: errors?.account_number,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'account_name',
      label: 'Account Name',
      type: 'text',
      value: formData?.account_name || '',
      disabled: true,
      error: errors?.account_name,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  // {
  //   kind: 'input',
  //   props: {
  //     className: 'w-100 m-b-20 col-3',
  //     name: 'country_code',
  //     label: 'Code',
  //     type: 'number',
  //     value: formData?.country_code || 234,
  //     validations: {
  //       required: false,
  //       maxLength: 4
  //     },
  //     error: errors?.country_code,
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'phone_number',
      label: 'Phone Number',
      type: 'number',
      value: formData?.phone_number || '',
      disabled: true,
      error: errors?.phone_number,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
  // {
  //   kind: 'input',
  //   props: {
  //     className: 'w-100 m-b-20 col-12',
  //     type: 'number',
  //     name: 'bvn',
  //     label: 'BVN',
  //     value: formData?.bvn || '',
  //     validations: {
  //       max: 11
  //     },
  //     error: errors?.bvn,
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // }
]);
export default formBuilderIndividualProps;
