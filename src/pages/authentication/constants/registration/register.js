import { profileType } from '../../../../utilities/dummyData';
import { validationPatterns } from '../../../../utilities/validation';

const formBuilderProps = (
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
      className: 'w-100 m-b-20',
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
      className: 'w-100 m-b-20',
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
      className: 'w-100 m-b-20',
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
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'profile_type',
      label: 'Select Profile Type',
      value: formData?.profile_type || '',
      options: profileType,
      validations: {
        required: true
      },
      disabled: selectDisabled,
      error: errors?.profile_type,
      optionIndex: 'type',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderProps;
