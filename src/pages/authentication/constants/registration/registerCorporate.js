import { projectType } from '../../../../utilities/dummyData';

const formBuilderCorporateProps = (
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
        text: 'Try Again'
      },
      btnMethod,
      error: errors?.account_number,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
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
export default formBuilderCorporateProps;
