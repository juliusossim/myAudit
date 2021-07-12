import { validationPatterns } from '../../../utilities/validation';

const formBuilderProps = (
  {
    formData,
    handleBlur,
    handleChange,
    skeleton,
    excuseSkeleton,
    errors,
    selectDisabled
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'first_name',
      type: 'text',
      label: 'First Name',
      value: formData?.first_name || '',
      disabled: true
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'last_name',
      type: 'text',
      label: 'Last Name',
      value: formData?.last_name || '',
      disabled: true
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
      disabled: true
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'phone_number',
      type: 'tel',
      label: 'Phone Number',
      value: formData?.phone_number || '',
      disabled: true
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'bvn',
      type: 'password',
      label: 'BVN',
      value: formData?.bvn || '',
      disabled: true
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'state',
      type: 'text',
      label: 'Location',
      value: formData?.state || '',
      disabled: true
    }
  },
  {
    kind: 'text_area',
    props: {
      className: 'w-100 m-b-20',
      name: 'biography',
      placeholder: 'type your description here...',
      label: 'Biography',
      skeleton,
      excuseSkeleton,
      value: formData?.summary || '',
      validations: {
        maxLength: 200
      },
      error: errors?.summary,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderProps;
