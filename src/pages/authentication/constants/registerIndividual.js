import { locations, managers, projectType } from '../../../utilities/dummyData';
import { validationPatterns } from '../../../utilities/validation';

const formBuilderIndividualProps = (
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
      className: 'w-100 m-b-20 col-6',
      name: 'first_name',
      label: 'First Name',
      type: 'text',
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
      className: 'w-100 m-b-20 col-6',
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
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
      className: 'w-100 m-b-20 col-6',
      name: 'phone_number',
      label: 'Phone Number',
      type: 'number',
      value: formData?.phone_number || '',
      validations: {
        required: false,
        max: 11
      },
      error: errors?.phone_number,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-6',
      name: 'bvn',
      label: 'BVN',
      value: formData?.bvn || '',
      validations: {
        max: 10
      },
      error: errors?.bvn,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderIndividualProps;
