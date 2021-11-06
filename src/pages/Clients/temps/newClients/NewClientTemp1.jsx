import React from 'react';
import FormBuilder from '../../../../components/form/builders/form';
import newClientProps from '../../constants/newClients';
import newClientProps3 from '../../constants/newClients3';
import ControlledAccordions from '../../../../components/ui/accordion';
import CustomAccordion from '../../../../components/ui/customAccordion';

const NewClientTemp1 = ({
  formData, setFormData, handleChange, errors, handleBlur, currentPanel, setCurrentPanel
}) => {
  console.log('here');
  return (
    <div className="">
      <CustomAccordion
        data={
          {
            name: 'Client Basic Info',
            details: (
              <div className="d-flex justify-content-between wrap">
                <FormBuilder
                  formItems={
                    newClientProps(
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
};
export default NewClientTemp1;
