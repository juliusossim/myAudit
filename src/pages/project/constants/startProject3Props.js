import { validationPatterns } from '../../../utilities/validation';
import { profileType, projectType } from '../../../utilities/dummyData';

const formBuilderProjectsPreviewProps = (
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
) => {
  const propsIndividual = {
    info: [
      {
        kind: 'input',
        props: {
          className: 'w-100 m-b-20',
          name: 'title',
          type: 'text',
          label: 'Project Name',
          value: formData?.title || '',
          validations: {
            required: true
          },
          loading,
          btn: {
            class: 'ml-18w bg-transparent text-wema',
            text: 'Try Again',
            success: 'Project initialized'
          },
          btnMethod,
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
          loading: loadingMedia,
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
          name: 'categoryId',
          label: 'Project Category',
          options: categories,
          optionIndex: 'name',
          valueIndex: 'id',
          titleIndex: 'description',
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
        kind: 'currency',
        props: {
          className: 'w-100 m-b-20',
          name: 'donationTarget',
          label: 'Target Amount',
          type: 'text',
          value: formData?.donationTarget || '',
          validations: {
            required: true
          },
          error: errors?.donationTarget,
          onBlur: handleBlur,
          onChange: handleChange
        }
      }
    ],
    location: [
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
        kind: 'select2',
        props: {
          className: 'w-100 m-b-20 pr-3',
          name: 'state',
          label: 'State',
          options: states,
          optionIndex: 'name',
          valueIndex: 'stateId',
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
          className: 'w-100 m-b-20 pr-3',
          name: 'lga',
          label: 'LGA',
          options: lgas,
          optionIndex: 'name',
          valueIndex: 'id',
          titleIndex: 'description',
          value: formData.lga || '',
          validations: {
            required: true
          },
          error: errors?.lga,
          onBlur: handleBlur,
          onChange: handleChange
        }
      }
    ],
    calendar: [

      {
        kind: 'date',
        props: {
          className: 'w-100 m-b-20 col-md-6',
          variant: 'static',
          // orientation: 'landscape',
          disablePast: true,
          name: 'startDate',
          minDate: minStartDate,
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
          className: 'w-100 m-b-20 col-md-6',
          variant: 'static',
          minDate,
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
      }
    ],
    description: [

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
    ]

  };
  const propsCorporate = {
    info: [
      {
        kind: 'input',
        props: {
          className: 'w-100 m-b-20',
          name: 'title',
          type: 'text',
          label: 'Project Name',
          value: formData?.title || '',
          validations: {
            required: true
          },
          loading,
          btn: {
            class: 'ml-18w bg-transparent text-wema',
            text: 'Try Again',
            success: 'Project initialized'
          },
          btnMethod,
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
          loading: loadingMedia,
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
          options: projectType,
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
          options: categories,
          optionIndex: 'name',
          valueIndex: 'id',
          titleIndex: 'description',
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
        kind: 'currency',
        props: {
          className: 'w-100 m-b-20',
          name: 'donationTarget',
          label: 'Target Amount',
          type: 'text',
          value: formData?.donationTarget || '',
          validations: {
            required: true
          },
          error: errors?.donationTarget,
          onBlur: handleBlur,
          onChange: handleChange
        }
      }
    ],
    location: [
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
        kind: 'select2',
        props: {
          className: 'w-100 m-b-20  pr-3',
          name: 'state',
          label: 'State',
          options: states,
          optionIndex: 'name',
          valueIndex: 'stateId',
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
          className: 'w-100 m-b-20 pr-3',
          name: 'lga',
          label: 'LGA',
          options: lgas,
          optionIndex: 'name',
          valueIndex: 'id',
          titleIndex: 'description',
          value: formData.lga || '',
          validations: {
            required: true
          },
          error: errors?.lga,
          onBlur: handleBlur,
          onChange: handleChange
        }
      }
    ],
    calendar: [

      {
        kind: 'date',
        props: {
          className: 'w-100 m-b-20 col-md-6',
          variant: 'static',
          // orientation: 'landscape',
          disablePast: true,
          name: 'startDate',
          minDate: minStartDate,
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
          className: 'w-100 m-b-20 col-md-6',
          variant: 'static',
          minDate,
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
      }
    ],
    description: [

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
    ]

  };
  const authUser = JSON.parse(localStorage.getItem('user'));
  if (authUser.role === 'User') {
    return propsIndividual;
  }
  return propsCorporate;
};
export default formBuilderProjectsPreviewProps;
