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
    },
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20',
        name: 'organisation_name',
        label: 'Organisation Name',
        value: formData?.organisation_name || '',
        validations: {
          required: true
        },
        error: errors?.organisation_name,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20 col-6',
        name: 'registration_number',
        label: 'Registration Number',
        value: formData?.registration_number || '',
        validations: {
          required: true
        },
        error: errors?.registration_number,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20 col-6',
        name: 'phone_number',
        label: 'Phone Number',
        type: 'number',
        value: formData?.phone_number || '',
        validations: {
          required: true,
          max: 11,
          min: 8
        },
        error: errors?.phone_number,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'text_area',
      props: {
        className: 'w-100 m-b-20',
        name: 'organisation_description',
        label: 'Organisation Description',
        placeholder: 'Type your description here...',
        value: formData?.organisation_description || '',
        validations: {
          maxLength: 500,
          required: true
        },
        error: errors?.organisation_description,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'file_input',
      props: {
        className: 'w-100 m-b-20',
        name: 'organisation_logo',
        label: 'Upload Organisation Logo',
        text: 'Upload Logo',
        value: formData?.organisation_logo || '',
        validations: {
          required: true,
          pattern: validationPatterns.image
        },
        error: errors?.organisation_logo,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'select',
      props: {
        className: 'w-100 m-b-20',
        name: 'manager_name',
        label: 'Manager Name',
        options: managers,
        optionIndex: 'fullName',
        value: formData?.manager_name || '',
        validations: {
          required: true
        },
        error: errors?.manager_name,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'select',
      props: {
        className: 'w-100 m-b-20',
        name: 'organisation_location',
        label: 'Organisation Location',
        options: locations,
        optionIndex: 'name',
        value: formData?.organisation_location || '',
        validations: {
          required: true
        },
        error: errors?.organisation_location,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
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
    }
  ]
);
export default formBuilderProps;
