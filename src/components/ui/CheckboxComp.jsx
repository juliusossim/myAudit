import React from 'react';
import CustomCheckbox from '../form/inputs/CustomCheckbox';

const CheckboxComp = ({
  checkboxName, text, checkboxCallBack, clss
}) => {
  const [formData, setFormData] = React.useState({});
  const handleChecked = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: !formData[name]
    });
    checkboxCallBack(!formData[name]);
  };
  return (
    <div className="m-b-10 d-flex">
      <CustomCheckbox
        name={checkboxName}
        checked={formData[checkboxName]}
        handleChecked={handleChecked}
      />
      <div className={`${clss} ml-1`}>
        {text}
      </div>
    </div>
  );
};
export default CheckboxComp;
