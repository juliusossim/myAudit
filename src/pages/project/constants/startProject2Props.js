import { days, locations } from '../../../utilities/dummyData';

const formBuilderProjectsStart2Props = (
  {
    formData,
    handleBlur,
    handleChange,
    handleDateChange,
    errors
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'projectAddress',
      label: 'Project Address',
      value: formData?.projectAddress || '',
      validations: {
        required: false
      },
      error: errors?.projectAddress,
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
    kind: 'date',
    props: {
      className: 'w-100 m-b-20 col-6',
      variant: 'static',
      // orientation: 'landscape',
      disablePast: true,
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      value: formData?.startDate || '',
      validations: {
        required: true
      },
      error: errors?.startDate,
      onBlur: handleBlur,
      onChange: handleDateChange
    }
  },
  {
    kind: 'date',
    props: {
      className: 'w-100 m-b-20 col-6',
      variant: 'static',
      minDate: new Date(),
      // orientation: 'landscape',
      disablePast: true,
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      value: formData?.endDate || '',
      validations: {
        required: true
      },
      error: errors?.endDate,
      onBlur: handleBlur,
      onChange: handleDateChange
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
