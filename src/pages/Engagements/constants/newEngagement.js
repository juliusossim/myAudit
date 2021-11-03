import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { validationPatterns } from '../../../utilities/validation';
import { profileType } from '../../../utilities/dummyData';
import { CheckboxField } from '../../../components/form/inputs/Checkbox';

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
    kind: 'select2',
    props: {
      className: 'w-100 m-b-20 pr-3 col-12 col-md-8',
      name: 'client',
      label: 'Select Client',
      options: clients,
      optionIndex: 'name',
      valueIndex: 'id',
      value: formData?.client || '',
      validations: {
        required: false
      },
      error: errors?.client,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'custom',
    props: {
      element: (
        <div key="year" className="w-100 col-12 col-md-4 mt-2">
          <p className="theme-font text-theme-black">Select Year</p>
          <DatePicker
            selected={formData.year}
            className="border-faint p-2 border-radius-5"
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
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-8',
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
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-4',
      name: 'staff_power',
      type: 'number',
      label: 'Staff Power',
      placeholder: 'Enter Staff Power',
      value: formData?.staff_power || '',
      error: errors?.staff_power,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'auditing_standard',
      label: 'Select Auditing Standard',
      value: formData?.auditing_standard || '',
      options: profileType,
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
      options: profileType,
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
  {
    kind: 'text_area',
    props: {
      className: 'w-100 m-b-20 col-12',
      name: 'members_dependence',
      type: 'text',
      label: 'Explain Member Dependence',
      placeholder: 'Explain Team affiliation ',
      value: formData?.members_dependence || '',
      validations: {
        required: true,
        maxLength: 100
      },
      error: errors?.members_dependence,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'external_expert',
      type: 'text',
      label: 'External Expert',
      placeholder: 'Enter External Expert',
      value: formData?.external_expert || '',
      error: errors?.external_expert,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20 col-12 col-md-6',
      name: 'partner_skill',
      type: 'text',
      label: 'Partner Skill',
      placeholder: 'Enter Partner Skill',
      value: formData?.partner_skill || '',
      error: errors?.partner_skill,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'custom',
    props: {
      element: <CheckboxField
        key="have"
        label="Have contacted "
        name="first_time"
        handleChecked={handleChecked}
        className="w-100 m-b-20 col-12 col-md-6"
        checked={formData?.is_public_entity}
      />
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'appointment_letter',
      label: 'Appointment Letter',
      text: 'Add Media',
      value: formData?.appointment_letter || '',
      file: formData?.file || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      uploads: uploads.appointment_letter,
      loading: loadingMedia,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.appointment_letter,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'contacted_previous_auditor',
      label: 'Contacted Previous Auditor',
      text: 'Add Media',
      value: formData?.contacted_previous_auditor || '',
      file: formData?.file || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      uploads: uploads.contacted_previous_auditor,
      loading: loadingMedia,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.contacted_previous_auditor,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'previous_auditor_response',
      label: 'Previous Auditor Response',
      text: 'Add Media',
      value: formData?.previous_auditor_response || '',
      file: formData?.file || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      uploads: uploads.previous_auditor_response,
      loading: loadingMedia,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.previous_auditor_response,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'engagement_letter',
      label: 'Engagement Letter',
      text: 'Add Media',
      value: formData?.engagement_letter || '',
      file: formData?.engagement_letter || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      uploads: uploads.engagement_letter,
      loading: loadingMedia,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.engagement_letter,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'other_audit_opinion',
      label: 'Other Audit Opinion',
      text: 'Add Media',
      value: formData?.other_audit_opinion || '',
      file: formData?.file || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      uploads: uploads.other_audit_opinion,
      loading: loadingMedia,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.other_audit_opinion,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },

  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'previous_year_management_letter',
      label: 'Previous Year Management',
      text: 'Add Media',
      value: formData?.previous_year_management_letter || '',
      file: formData?.file || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      uploads: uploads.previous_year_management_letter,
      loading: loadingMedia,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.previous_year_management_letter,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },

  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'previous_year_asf',
      label: 'Previous Year ASF',
      text: 'Add Media',
      value: formData?.previous_year_asf || '',
      file: formData?.file || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      uploads: uploads.previous_year_asf,
      loading: loadingMedia,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.previous_year_asf,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'previous_audit_review',
      label: 'Previous Audit Review',
      text: 'Add Media',
      value: formData?.previous_audit_review || '',
      file: formData?.file || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      uploads: uploads.previous_audit_review,
      loading: loadingMedia,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.previous_audit_review,
      // onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'previous_audit_opinion',
      label: 'Previous Audit Opinion',
      text: 'Add Media',
      value: formData?.previous_audit_opinion || '',
      file: formData?.file || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      uploads: uploads.previous_audit_opinion,
      loading: loadingMedia,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.previous_audit_opinion,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }

]);
export default newEngagementProps;
