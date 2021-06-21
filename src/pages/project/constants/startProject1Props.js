import { projectType, projectCategories, profileType } from '../../../utilities/dummyData';
import { validationPatterns } from '../../../utilities/validation';

const formBuilderProjectsStartProps = (
  {
    formData,
    multiple,
    removeItem,
    setFormData,
    progress,
    handleBlur,
    handleChange,
    btnMethod,
    loading,
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
      loading,
      btn: {
        class: 'ml-18w bg-transparent text-wema',
        text: 'Try Again'
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
  }
]);
export default formBuilderProjectsStartProps;
