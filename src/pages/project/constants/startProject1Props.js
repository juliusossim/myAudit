import { projectType, projectCategories } from '../../../utilities/dummyData';
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
    errors
  }
) => ([
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'project_name',
      label: 'Project Name',
      value: formData?.project_name || '',
      validations: {
        required: true
      },
      error: errors?.project_name,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'file_input',
    props: {
      className: 'w-100 m-b-20',
      name: 'project_media',
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
      name: 'short_description',
      placeholder: 'type your description here...',
      label: 'Short Description',
      value: formData?.short_description || '',
      validations: {
        maxLength: 200
      },
      error: errors?.short_description,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'project_type',
      label: 'Project Type',
      options: projectType,
      optionIndex: 'type',
      value: formData?.project_type || '',
      validations: {
        required: true
      },
      error: errors?.project_type,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'select',
    props: {
      className: 'w-100 m-b-20',
      name: 'project_category',
      label: 'Project Category',
      options: projectCategories,
      optionIndex: 'name',
      value: formData?.project_category || '',
      validations: {
        required: true
      },
      error: errors?.project_category,
      onBlur: handleBlur,
      onChange: handleChange
    }
  },
  {
    kind: 'input',
    props: {
      className: 'w-100 m-b-20',
      name: 'target_amount',
      label: 'Target Amount',
      type: 'number',
      value: formData?.target_amount || '',
      validations: {
        required: true
      },
      error: errors?.target_amount,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderProjectsStartProps;
