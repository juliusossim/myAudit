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
  },
  {
    kind: 'tags',
    props: {
      className: formData?.is_part_of_group ? 'w-100 m-b-20 col-12' : 'd-none',
      name: 'subsidiary_name',
      type: 'text',
      label: 'Subsidiary Name',
      placeholder: 'Enter Subsidiary Name',
      formData,
      setFormData
    }
  },
  {
    kind: 'tags',
    props: {
      className: formData?.is_part_of_group ? ' w-100 m-b-20 col-12 ' : 'd-none',
      name: 'subsidiary_nature_of_business',
      type: 'text',
      label: 'Subsidiary Business Nature',
      placeholder: 'E.G: Housing',
      formData,
      setFormData
    }
  },
  {
    kind: 'tags',
    props: {
      className: formData?.is_part_of_group ? ' w-100 m-b-20 col-12 col-md-6 ' : 'd-none',
      name: 'subsidiary_nature',
      type: 'text',
      label: 'Subsidiary Nature',
      placeholder: 'E.G: LTD',
      formData,
      setFormData
    }
  },
  {
    kind: 'tags',
    props: {
      className: formData?.is_part_of_group ? 'w-100 m-b-20 col-12 col-md-6 ' : 'd-none',
      name: 'subsidiary_percentage_holding',
      type: 'number',
      label: 'Subsidiary Percentage Holding',
      placeholder: 'E.G: 5%',
      formData,
      setFormData
    }
  }
]);
export default newClientProps2;
