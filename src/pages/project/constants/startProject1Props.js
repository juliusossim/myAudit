import { projectType, profileType } from '../../../utilities/dummyData';
import { validationPatterns } from '../../../utilities/validation';

const formBuilderProjectsStartProps = (
  {
    formData,
    categories,
    multiple,
    removeItem,
    setFormData,
    skeleton,
    progress,
    handleBlur,
    handleChange,
    btnMethod,
    loading,
    errors
  }
) => {
  const propsCorporate = [
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
        skeleton,
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
        skeleton,
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
        skeleton,
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
        options: categories,
        optionIndex: 'name',
        valueIndex: 'id',
        skeleton,
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
        skeleton,
        value: formData?.donationTarget || '',
        validations: {
          required: true
        },
        error: errors?.donationTarget,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ];
  const propsIndividual = [
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
  ];
  const authUser = JSON.parse(localStorage.getItem('loginData'));
  if (authUser.role_id === 1) {
    return propsIndividual;
  }
  return propsCorporate;
};
export default formBuilderProjectsStartProps;
