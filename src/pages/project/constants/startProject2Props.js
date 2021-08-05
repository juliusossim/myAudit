import NaijaStates from 'naija-state-local-government';

const formBuilderProjectsStart2Props = (
  {
    formData,
    states,
    lgas,
    handleBlur,
    handleChange,
    handleDateChange,
    skeleton,
    excuseSkeleton,
    errors,
    minStartDate,
    minDate
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'projectAddress',
      label: 'Project Address',
      skeleton,
      excuseSkeleton,
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
    kind: 'select2',
    props: {
      className: 'w-100 m-b-20 col-6',
      name: 'state',
      label: 'State',
      options: states,
      optionIndex: 'stateName',
      valueIndex: 'stateId',
      skeleton,
      excuseSkeleton,
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
    kind: 'select2',
    props: {
      className: 'w-100 m-b-20 col-6',
      name: 'lga',
      label: 'LGA',
      options: lgas,
      optionIndex: 'name',
      valueIndex: 'id',
      skeleton,
      excuseSkeleton,
      titleIndex: 'description',
      value: formData.lga || '',
      validations: {
        required: true
      },
      error: errors?.lga,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'date',
    props: {
      className: 'w-100 m-b-20 col-6',
      variant: 'standard',
      // orientation: 'landscape',
      disablePast: true,
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      skeleton,
      minDate: minStartDate,
      excuseSkeleton,
      helperText: 'if approved, your project starts next week by default',
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
      variant: 'standard',
      minDate,
      // orientation: 'landscape',
      disablePast: true,
      name: 'endDate',
      label: 'End Date',
      skeleton,
      excuseSkeleton,
      helperText: 'The default end date is two weeks away.',
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
      rows: 10,
      skeleton,
      excuseSkeleton,
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
