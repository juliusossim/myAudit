import React from 'react';
import FormBuilder from '../../../../components/form/builders/form';
import newClientBasicDataProps from '../../constants/basicInfo';
import CustomAccordion from '../../../../components/ui/customAccordion';

const NewClientBasicData = ({
  formData, setFormData, handleChange, errors, handleBlur, currentPanel, setCurrentPanel
}) => (
  <div className="">
    <CustomAccordion
      data={
        {
          name: 'Client Basic Info',
          details: (
            <div className="d-flex justify-content-between wrap">
              <FormBuilder
                formItems={
                  newClientBasicDataProps(
                    {
                      formData,
                      handleBlur,
                      handleChange,
                      errors
                    }
                  )
                }
              />
            </div>
          )
        }
      }
      panel={1}
      currentPanel={currentPanel}
      setCurrentPanel={setCurrentPanel}
    />
  </div>
);
export default NewClientBasicData;
