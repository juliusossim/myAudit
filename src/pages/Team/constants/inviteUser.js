import { designations, profileType, userRoles } from '../../../utilities/dummyData';
import { validationPatterns } from '../../../utilities/validation';

const inviteUser = (
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
      name: 'name',
      label: 'Full Name',
      type: 'text',
      value: formData?.name || '',
      validations: {
        required: true,
        maxLength: 15
      },
      error: errors?.name,
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
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'role_id',
      label: 'Select User Role',
      value: formData?.role_id || '',
      options: userRoles,
      validations: {
        required: true
      },
      error: errors?.role_id,
      optionIndex: 'type',
      valueIndex: 'id',
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default inviteUser;
