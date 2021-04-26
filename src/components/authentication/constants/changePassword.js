import { locations, managers, projectType } from '../../../utilities/dummyData';
import { validationPatterns } from '../../../utilities/validation';

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
        name: 'currentPassword',
        type: 'password',
        label: 'Current Password',
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
        name: 'newPassword',
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
