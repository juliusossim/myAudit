import React from 'react';
import { validationPatterns } from '../../../utilities/validation';
import { CheckboxField } from '../../../components/form/inputs/Checkbox';

const newClientProps2 = (
  {
    formData,
    setFormData,
    handleChecked
  }
) => ([
  {
    kind: 'custom',
    props: {
      element: <CheckboxField
        label="It's a Public Company"
        name="is_public_entity"
        handleChecked={handleChecked}
        className="w-100 m-b-20 col-12 col-md-6"
        checked={formData?.is_public_entity}
      />
    }
  },
  {
    kind: 'custom',
    props: {
      element: <CheckboxField
        label="It's part of a group"
        name="is_part_of_group"
        handleChecked={handleChecked}
        className="w-100 m-b-20 col-12 col-md-6"
        checked={formData?.is_part_of_group}
      />
    }
  }
]);
export default newClientProps2;
