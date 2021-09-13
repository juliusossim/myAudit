import { countries } from '../../../../utilities/dummyData';
import { validationPatterns } from '../../../../utilities/validation';

const donationProps = (
  {
    formData,
    categories,
    loading,
    btnMethod,
    states,
    lgas,
    multiple,
    removeItem,
    setFormData,
    progress,
    handleBlur,
    handleChange,
    handleDateChange,
    errors,
    minDate,
    minStartDate,
    loadingMedia
  }
) => ({
  info: [
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20 col-md-6 bg-light',
        name: 'fullName',
        type: 'text',
        label: 'Full Name',
        value: formData?.fullName || '',
        validations: {
          required: true
        },
        error: errors?.fullName,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'input',
      props: {
        className: 'w-100 m-b-20 col-md-6 bg-light',
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
        className: 'w-100 m-b-20 col-md-6 bg-light',
        name: 'phone_number',
        type: 'text',
        label: 'Phone Number',
        value: formData?.phone_number || '',
        error: errors?.phone_number,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'select',
      props: {
        className: 'w-100 m-b-20 col-md-6 bg-light',
        name: 'country',
        label: 'Country',
        options: countries,
        optionIndex: 'name',
        valueIndex: 'id',
        titleIndex: 'name',
        value: formData?.country || '',
        validations: {
          required: true
        },
        error: errors?.country,
        onBlur: handleBlur,
        onChange: handleChange
      }
    },
    {
      kind: 'text_area',
      props: {
        className: 'w-100 m-b-20 mx-3 bg-light',
        name: 'comment',
        placeholder: 'type your comment here...',
        label: 'Add Comment (optional)',
        value: formData?.comment || '',
        validations: {
          maxLength: 500
        },
        error: errors?.comment,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ],
  amount: [

    {
      kind: 'currency',
      props: {
        className: 'w-100 m-b-20 bg-light',
        name: 'donation',
        label: 'Donation Amount',
        type: 'text',
        value: formData?.donation || '',
        validations: {
          required: true
        },
        error: errors?.donation,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ]

});
export default donationProps;
