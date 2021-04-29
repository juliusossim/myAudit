const formBuilderProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors
  }
) => (
  [
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20',
        name: 'current_password',
        type: 'password',
        label: 'Current Password',
        value: formData?.current_password || '',
        validations: {
          required: true
        },
        error: errors?.current_password,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20',
        name: 'new_password',
        type: 'password',
        label: 'New Password',
        value: formData?.new_password || '',
        validations: {
          required: true,
          minLength: 8
        },
        error: errors?.new_password,
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
          confirm_password: true,
          confirmPassword: true,
          original: formData?.new_password
        },
        error: errors?.confirm_password,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ]
);
export default formBuilderProps;
