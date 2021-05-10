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
        name: 'email',
        type: 'email',
        label: 'Email Address',
        value: formData?.email || '',
        validations: {
          required: true
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
        label: 'New Password',
        value: formData?.password || '',
        validations: {
          required: true,
          minLength: 8
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
          confirm_password: true,
          confirmPassword: true,
          original: formData?.password
        },
        error: errors?.confirm_password,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ]
);
export default formBuilderProps;
