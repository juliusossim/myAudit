import { validationPatterns } from '../../../utilities/validation';
import { partners } from '../../../utilities/dummyData';

const completeProfile1Props = (
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
      className: 'w-100 m-b-20 col-md-6 col-12',
      name: 'first_name',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter First Name',
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
      className: 'w-100 m-b-20 col-md-6 col-12',
      name: 'last_name',
      type: 'text',
      label: 'Surname',
      placeholder: 'Enter Surname',
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
      className: 'w-100 m-b-20 col-12',
      name: 'company_email',
      type: 'email',
      label: 'Company Email Address',
      placeholder: 'Enter Company Email Address',
      value: formData?.company_email || '',
      validations: {
        required: true,
        pattern: validationPatterns.email
      },
      error: errors?.company_email,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'company_name',
      type: 'text',
      label: 'Name of Audit Firm',
      placeholder: 'Enter name of audit firm',
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
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-md-6 col-12',
      name: 'designation',
      type: 'text',
      label: 'Designation',
      placeholder: 'Enter Designation',
      value: formData?.designation || '',
      validations: {
        required: true
      },
      error: errors?.designation,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  // {
  //   kind: 'select',
  //   props: {
  //     className: 'w-100 m-b-20 col-md-6 col-12',
  //     name: 'partners',
  //     label: 'Number of Partners',
  //     value: formData?.partners || '',
  //     partners,
  //     validations: {
  //       required: true
  //     },
  //     disabled: selectDisabled,
  //     error: errors?.partners,
  //     optionIndex: 'name',
  //     valueIndex: 'value',
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // },
  // {
  //   kind: 'select',
  //   props: {
  //     className: 'w-100 m-b-20 col-md-6 col-12',
  //     name: 'clients',
  //     label: 'Number of Clients',
  //     value: formData?.clients || '',
  //     partners,
  //     validations: {
  //       required: true
  //     },
  //     disabled: selectDisabled,
  //     error: errors?.clients,
  //     optionIndex: 'name',
  //     valueIndex: 'value',
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // },
  // {
  //   kind: 'select',
  //   props: {
  //     className: 'w-100 m-b-20 col-md-6 col-12',
  //     name: 'staffs',
  //     label: 'Number of Staffs',
  //     value: formData?.staffs || '',
  //     partners,
  //     validations: {
  //       required: true
  //     },
  //     disabled: selectDisabled,
  //     error: errors?.staffs,
  //     optionIndex: 'name',
  //     valueIndex: 'value',
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'managing_partner_phone',
      type: 'tel',
      label: 'Phone Number - Managing Partner',
      placeholder: 'Enter Phone Number',
      value: formData?.managing_partner_phone || '',
      validations: {
        required: true
      },
      error: errors?.managing_partner_phone,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'company_phone',
      type: 'tel',
      label: 'Company Phone',
      placeholder: 'Enter Company Phone Number',
      value: formData?.company_phone || '',
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'managing_partner_name',
      type: 'text',
      label: 'Managing Partner Name',
      placeholder: 'Enter Managing Partner Name',
      value: formData?.managing_partner_name || '',
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'managing_partner_email',
      type: 'email',
      label: 'Email Address - Managing Partner',
      placeholder: 'Enter Email Address',
      value: formData?.managing_partner_email || '',
      validations: {
        required: true,
        pattern: validationPatterns.email
      },
      error: errors?.managing_partner_email,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
  // {
  //   kind: 'input',
  //   props: {
  //     className: 'w-100 m-b-20 col-12',
  //     name: 'ican_tag',
  //     type: 'text',
  //     label: 'ICAN tag Nos.',
  //     placeholder: 'Enter ICAN tag number',
  //     value: formData?.ican_tag || '',
  //     onChange: handleChange
  //   }
  // }
]);
export default completeProfile1Props;
