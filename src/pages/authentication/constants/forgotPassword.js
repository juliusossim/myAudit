import { validationPatterns } from '../../../utilities/validation';

const forgotPasswordProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    subscribe
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 subscribe-input',
      name: 'email',
      type: 'email',
      label: subscribe ? '' : 'Email Address',
      value: formData?.email || '',
      validations: {
        required: !subscribe,
        pattern: validationPatterns.email
      },
      error: errors?.email,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default forgotPasswordProps;
