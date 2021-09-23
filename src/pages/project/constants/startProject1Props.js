import { projectType } from '../../../utilities/dummyData';
import { validationPatterns } from '../../../utilities/validation';

export const formBuilderProjectsStartProps = (
  {
    formData,
    categories,
    multiple,
    removeItem,
    setFormData,
    skeleton,
    excuseSkeleton,
    progress,
    handleBlur,
    handleChange,
    btnMethod,
    loading,
    loadingMedia,
    errors
  }
) => {
  const propsCorporate = [
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
        excuseSkeleton,
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
        skeleton,
        excuseSkeleton,
        value: formData?.summary || '',
        validations: {
          maxLength: 100
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
        excuseSkeleton,
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
        skeleton,
        excuseSkeleton,
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
        excuseSkeleton,
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
      kind: 'file_input',
      props: {
        className: 'w-100 m-b-20',
        name: 'media',
        label: 'Project Media (images and videos)',
        accepted: 'jpeg, jpg, mp4, ogg, etc',
        text: 'Add Media',
        skeleton,
        excuseSkeleton,
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
        skeleton,
        excuseSkeleton,
        label: 'Short Description',
        rows: 5,
        value: formData?.summary || '',
        validations: {
          maxLength: 100
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
        skeleton,
        excuseSkeleton,
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
        skeleton,
        excuseSkeleton,
        type: 'text',
        value: formData?.donationTarget || '',
        validations: {
          required: true
        },
        loading,
        btn: {
          class: 'ml-18w bg-transparent text-wema',
          text: 'retrieve categories'
        },
        btnMethod,
        error: errors?.donationTarget,
        onBlur: handleBlur,
        onChange: handleChange
      }
    }
  ];
  const authUser = JSON.parse(localStorage.getItem('user'));
  if (authUser.role === 'User') {
    return propsIndividual;
  }
  return propsCorporate;
};
export const title = (
  {
    formData,
    skeleton,
    excuseSkeleton,
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
      helperText: 'A super title commands super response!',
      type: 'text',
      label: 'Project Name',
      skeleton,
      excuseSkeleton,
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
  }
]);
