import { profileType } from '../../../../utilities/dummyData';
import { validationPatterns } from '../../../../utilities/validation';

const formBuilderProps = (
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
      className: 'w-100 m-b-20',
      name: 'otp',
      type: 'text',
      label: 'OTP',
      value: formData?.otp || '',
      validations: {
        required: true
      },
      error: errors?.otp,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }
]);
export default formBuilderProps;
