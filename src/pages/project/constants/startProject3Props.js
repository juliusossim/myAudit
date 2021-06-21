import {
  projectType, projectCategories, profileType, locations
} from '../../../utilities/dummyData';
import { validationPatterns } from '../../../utilities/validation';

const formBuilderProjectsPreviewProps = (
  {
    formData,
    multiple,
    removeItem,
    setFormData,
    progress,
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
      name: 'title',
      label: 'Project Name',
      value: formData?.title || '',
      validations: {
        required: true
      },
      error: errors?.title,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'media',
      label: 'Project Media (images and videos)',
      text: 'Add Media',
      value: formData?.project_media || '',
      file: formData?.file || '',
      multiple,
      removeItem,
      setFormData,
      progress,
      validations: {
        required: true,
        pattern: validationPatterns.image
      },
      error: errors?.project_media,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'text_area',
    props: {
      className: 'w-100 m-b-20',
      name: 'summary',
      placeholder: 'type your description here...',
      label: 'Short Description',
      value: formData?.summary || '',
      validations: {
        maxLength: 200
      },
      error: errors?.summary,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'projectType',
      label: 'Project Type',
      optionIndex: 'type',
      valueIndex: 'value',
      value: formData?.projectType || '',
      options: profileType,
      validations: {
        required: true
      },
      error: errors?.projectType,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'categoryId',
      label: 'Project Category',
      options: projectCategories,
      optionIndex: 'name',
      valueIndex: 'id',
      value: formData?.categoryId || '',
      validations: {
        required: true
      },
      error: errors?.categoryId,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'donationTarget',
      label: 'Target Amount',
      type: 'number',
      value: formData?.donationTarget || '',
      validations: {
        required: true
      },
      error: errors?.donationTarget,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
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
      helperText: 'it may take about 5 working days to get your project approved',
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
      helperText: 'consider padding for approval delays.',
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
export default formBuilderProjectsPreviewProps;
