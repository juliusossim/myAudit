import { days, locations } from '../../../utilities/dummyData';

const formBuilderProjectsStart2Props = (
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
      name: 'target',
      label: 'Target Amount',
      value: formData?.target || '',
      validations: {
        required: true
      },
      error: errors?.target,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'days',
      label: 'Project Duration',
      options: days,
      optionIndex: 'name',
      value: formData?.days || '',
      validations: {
        required: true
      },
      error: errors?.days,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'location',
      label: 'Project Location',
      options: locations,
      optionIndex: 'name',
      value: formData?.location || '',
      validations: {
        required: true
      },
      error: errors?.location,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },

  {
    kind: 'text_area',
    props: {
      className: 'w-100 m-b-20',
      name: 'description',
      placeholder: 'type your description here...',
      label: 'Description',
      value: formData?.description || '',
      validations: {
        maxLength: 500
      },
      error: errors?.description,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderProjectsStart2Props;
