import { validationPatterns } from '../../../utilities/validation';

const formBuilderProps = (
  {
    formData,
    errors
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'account_number',
      type: 'number',
      label: 'Account Number',
      value: formData?.account_number || '',
      disabled: true,
      validations: {
        required: true,
        pattern: validationPatterns.account_number
      },
      error: errors?.account_number
      // onBlur: handleBlur,
      // onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'account_name',
      type: 'text',
      label: 'Account Name',
      value: formData?.account_name || '',
      disabled: true,
      validations: {
        required: true,
        pattern: validationPatterns.account_name
      },
      error: errors?.account_name
      // onBlur: handleBlur,
      // onChange: handleChange
    }
  }
]);
export default formBuilderProps;
