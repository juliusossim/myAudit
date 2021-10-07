import { validationPatterns } from '../../../utilities/validation';

const loginProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    selectDisabled
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter email address',
      value: formData?.email || '',
      validations: {
        required: true,
        pattern: validationPatterns.email
      },
      error: errors?.email,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'password',
      type: 'password',
      placeholder: 'Enter password',
      hidePasswordValidations: 'yes',
      label: 'Password',
      value: formData?.password || '',
      validations: {
        required: true,
        pattern: validationPatterns.password
      },
      error: errors?.password,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default loginProps;
