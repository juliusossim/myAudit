import { locations, managers, projectType } from '../../../utilities/dummyData';
import { validationPatterns } from '../../../utilities/validation';

const formBuilderProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors
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
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'project_type',
      label: 'Select Project Type',
      value: formData?.project_type || '',
      options: projectType,
      validations: {
        required: true
      },
      error: errors?.project_type,
      optionIndex: 'type',
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderProps;
