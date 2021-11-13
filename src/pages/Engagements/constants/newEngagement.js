import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { accountingStandards, auditingStandards } from '../../../utilities/dummyData';

const newEngagementProps = (
  {
    formData,
    handleBlur,
    handleChange,
    errors,
    multiple,
    removeItem,
    setFormData,
    progress,
    loadingMedia,
    handleChecked,
    uploads,
    handleDateChange,
    clients
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-8',
      name: 'name',
      type: 'text',
      label: 'Engagement Name',
      placeholder: 'Enter Engagement Name',
      value: formData?.name || '',
      validations: {
        required: true
      },
      error: errors?.name,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 pr-3 col-4',
      name: 'client_id',
      label: 'Select Client',
      options: clients,
      optionIndex: 'name',
      valueIndex: 'id',
      value: formData?.client_id || [],
      validations: {
        required: false
      },
      error: errors?.client_id,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'custom',
    props: {
      key: 'year_key',
      element: (
        <div className="w-100 col-12 col-md-4 mt-2">
          <p className="theme-font text-theme-black">Select Audit Year</p>
          <DatePicker
            selected={formData.year}
            className="border-faint border-radius-5 theme-padding"
            name="year"
            onChange={(date) => handleDateChange({ date, name: 'year' })}
            showYearPicker
            dateFormat="yyyy"
            yearItemNumber={9}
            dropdownMode="select"
          />
        </div>
      )
    }
  },
  // {
  //   kind: 'input',
  //   props: {
  //     className: 'w-100 m-b-20 col-12 col-md-7',
  //     name: 'staff_power',
  //     type: 'number',
  //     label: 'Staff Power',
  //     placeholder: 'Enter Staff Power',
  //     value: formData?.staff_power || '',
  //     error: errors?.staff_power,
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'auditing_standard',
      label: 'Select Auditing Standard',
      value: formData?.auditing_standard || '',
      options: auditingStandards,
      validations: {
        required: true
      },
      error: errors?.auditing_standard,
      optionIndex: 'type',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'accounting_standard',
      label: 'Select Accounting Standard',
      value: formData?.accounting_standard || '',
      options: accountingStandards,
      validations: {
        required: true
      },
      error: errors?.accounting_standard,
      optionIndex: 'type',
      valueIndex: 'value',
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  // {
  //   kind: 'text_area',
  //   props: {
  //     className: 'w-100 m-b-20 col-12',
  //     name: 'members_dependence',
  //     type: 'text',
  //     label: 'Explain Member Dependence',
  //     placeholder: 'Explain Team affiliation ',
  //     value: formData?.members_dependence || '',
  //     validations: {
  //       required: true,
  //       maxLength: 100
  //     },
  //     error: errors?.members_dependence,
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // },
  // {
  //   kind: 'input',
  //   props: {
  //     className: 'w-100 m-b-20 col-12 col-md-6',
  //     name: 'external_expert',
  //     type: 'text',
  //     label: 'External Expert',
  //     placeholder: 'Enter External Expert',
  //     value: formData?.external_expert || '',
  //     error: errors?.external_expert,
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // },
  // {
  //   kind: 'input',
  //   props: {
  //     className: 'w-100 m-b-20 col-12 col-md-6',
  //     name: 'partner_skill',
  //     type: 'text',
  //     label: 'Partner Skill',
  //     placeholder: 'Enter Partner Skill',
  //     value: formData?.partner_skill || '',
  //     error: errors?.partner_skill,
  //     onBlur: handleBlur,
  //     onChange: handleChange
  //   }
  // }

]);
export default newEngagementProps;
