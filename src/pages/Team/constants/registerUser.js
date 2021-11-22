import { designations } from '../../../utilities/dummyData';
import { validationPatterns } from '../../../utilities/validation';

const registerUserProps = (
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
      className: 'w-100 m-b-20 col-12 ',
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      value: formData?.first_name || '',
      validations: {
        required: true,
        maxLength: 15
      },
      error: errors?.first_name,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      value: formData?.last_name || '',
      disabled: true,
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
      label: 'Phone Number',
      type: 'tel',
      value: formData?.phone || '',
      validations: {
        required: true,
        max: 14,
        min: 9
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
export default registerUserProps;
