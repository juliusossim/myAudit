import { validationPatterns } from '../../../utilities/validation';
import { partners } from '../../../utilities/dummyData';

const newEngagementProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    selectDisabled
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'company_name',
      type: 'text',
      label: 'Company Name',
      placeholder: 'Enter Company Name',
      value: formData?.company_name || '',
      validations: {
        required: true
      },
      error: errors?.company_name,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'partner',
      label: 'Engagement Partner',
      value: formData?.partners || '',
      partners,
      validations: {
        required: true
      },
      placeholder: 'Select/Enter Engagement Partner',
      disabled: selectDisabled,
      error: errors?.partners,
      optionIndex: 'name',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'qrp',
      label: 'Engagement QRP',
      value: formData?.clients || '',
      placeholder: 'Select/Enter Engagement QRP',
      partners,
      validations: {
        required: true
      },
      disabled: selectDisabled,
      error: errors?.clients,
      optionIndex: 'name',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'manager',
      label: 'Engagement Manager',
      value: formData?.clients || '',
      placeholder: 'Select/Enter Engagement Manager',
      partners,
      disabled: selectDisabled,
      error: errors?.clients,
      optionIndex: 'name',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'team',
      label: 'Engagement Team Member',
      value: formData?.clients || '',
      placeholder: 'Select/Enter Engagement Team Member',
      partners,
      validations: {
        required: true
      },
      disabled: selectDisabled,
      error: errors?.clients,
      optionIndex: 'name',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'year',
      label: 'Engagement Year',
      value: formData?.clients || '',
      placeholder: 'Select Engagement Year',
      partners,
      validations: {
        required: true
      },
      disabled: selectDisabled,
      error: errors?.clients,
      optionIndex: 'name',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'qrp',
      label: 'Is This The First Time Engagement',
      value: formData?.clients || '',
      placeholder: 'Select',
      partners,
      validations: {
        required: true
      },
      disabled: selectDisabled,
      error: errors?.clients,
      optionIndex: 'name',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default newEngagementProps;
