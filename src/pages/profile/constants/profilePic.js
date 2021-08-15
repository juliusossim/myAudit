import { validationPatterns } from '../../../utilities/validation';

const profileProps = (
  {
    formData,
    multiple,
    removeItem,
    setFormData,
    skeleton,
    excuseSkeleton,
    progress,
    handleBlur,
    handleChange,
    loadingMedia,
    errors
  }
) => ([
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
  }
]);
export default profileProps;
