import { locations } from '../../../../utilities/dummyData';
import { validationPatterns } from '../../../../utilities/validation';

const formBuilderCorporateProps = (
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
      name: 'rc_number',
      label: 'Registration Number',
      value: formData?.rc_number || '',
      validations: {
        required: true
      },
      error: errors?.rc_number,
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
      type: 'tel',
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
      name: 'description',
      label: 'Organisation Description',
      placeholder: 'Type your description here...',
      value: formData?.description || '',
      validations: {
        maxLength: 500
        // required: true
      },
      error: errors?.description,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'logo_id',
      label: 'Upload Organisation Logo',
      text: 'Upload Logo',
      value: formData?.logo_id || '',
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.logo_id,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'location',
      label: 'Organisation Location',
      options: locations,
      optionIndex: 'name',
      value: formData?.location || '',
      validations: {
        // required: true
      },
      error: errors?.location,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderCorporateProps;
