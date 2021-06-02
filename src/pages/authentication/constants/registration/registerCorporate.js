import { projectType } from '../../../../utilities/dummyData';

const formBuilderCorporateProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    btnMethod,
    selectDisabled,
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
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'account_name',
      label: 'Select Manager',
      value: formData?.profile_type || '',
      options: projectType,
      validations: {
        required: true
      },
      disabled: selectDisabled,
      error: errors?.project_type,
      optionIndex: 'type',
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
      type: 'number',
      value: formData?.phone_number || '',
      disabled: true,
      error: errors?.phone_number,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderCorporateProps;
