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
      name: 'address',
      label: 'Project Address',
      value: formData?.address || '',
      validations: {
        required: false
      },
      error: errors?.address,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-6',
      name: 'city',
      label: 'City',
      value: formData?.city || '',
      validations: {
        required: false
      },
      error: errors?.city,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-6',
      name: 'state',
      label: 'State',
      options: locations,
      optionIndex: 'name',
      value: formData?.state || '',
      validations: {
        required: false
      },
      error: errors?.state,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-6',
      name: 'start_date',
      label: 'Start Date',
      type: 'date',
      value: formData?.start_date || '',
      validations: {
        required: true
      },
      error: errors?.start_date,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-6',
      name: 'end_date',
      label: 'End Date',
      type: 'date',
      value: formData?.end_date || '',
      validations: {
        required: true
      },
      error: errors?.end_date,
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
