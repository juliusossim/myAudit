import { validationPatterns } from '../../../utilities/validation';

const registerProps = (
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
      className: 'w-100 m-b-20 col-md-6',
      name: 'first_name',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter First Name',
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
      className: 'w-100 m-b-20 col-md-6',
      name: 'last_name',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter Last Name',
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
      className: 'w-100 m-b-20 col-12',
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
      className: 'w-100 m-b-20 col-12',
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter Email Address',
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
      label: 'Password',
      placeholder: 'Enter Password',
      value: formData?.password || '',
      validations: {
        required: true,
        pattern: validationPatterns.password
      },
      error: errors?.password,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'confirm_password',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      value: formData?.confirm_password || '',
      validations: {
        required: true,
        confirmPassword: true,
        original: formData?.password
      },
      error: errors?.confirm_password,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default registerProps;
