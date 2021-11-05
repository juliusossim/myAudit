import React, { useState } from 'react';
import FormBuilder from '../../../../components/form/builders/form';
import newClientProps3 from '../../constants/newClients3';
import CustomAccordion from '../../../../components/ui/customAccordion';

const NewClientTemp2 = ({
  formData, setFormData, handleChange, errors, handleBlur, currentPanel, setCurrentPanel
}) => {
  const [subsidiaries, setSubsidiaries] = useState([]);
  const [currPan, setCurrPan] = useState(1);
  const addSub = () => {
    setSubsidiaries([
      ...subsidiaries,
      {
        subsidiary_name: formData.subsidiary_name_alt,
        subsidiary_nature_of_business: formData.subsidiary_nature_of_business_alt,
        subsidiary_nature: formData.subsidiary_nature_alt,
        subsidiary_percentage_holding: formData.subsidiary_percentage_holding_alt
      }
    ]);
    setFormData({
      ...formData,
      subsidiary_name_main: [...formData.subsidiary_name_main, formData.subsidiary_name_alt],
      subsidiary_nature_of_business_main:
        [
          ...formData.subsidiary_nature_of_business_main,
          formData.subsidiary_nature_of_business_alt
        ],
      subsidiary_nature_main: [...formData.subsidiary_nature_main, formData.subsidiary_nature_alt],
      subsidiary_percentage_holding_main:
        [
          ...formData.subsidiary_percentage_holding_main,
          formData.subsidiary_percentage_holding_alt
        ],
      subsidiary_name_alt: '',
      subsidiary_nature_of_business_alt: '',
      subsidiary_nature_alt: '',
      subsidiary_percentage_holding_alt: ''
    });
  };
  return (
    <div className="">
      <CustomAccordion
        data={
          {
            name: 'Subsidiaries',
            details: (
              <div className="">
                {
                  subsidiaries.map((item, index) => (
                    <div className="px-5">
                      <CustomAccordion
                        data={{
                          name: <div className="text-theme-blue">{item.subsidiary_name}</div>,
                          details: (
                            <div>
                              <p>{`Nature: ${item.subsidiary_nature}`}</p>
                              <p>{`Business Nature: ${item.subsidiary_nature_of_business}`}</p>
                              <p>{`Percentage Holding: ${item.subsidiary_percentage_holding}`}</p>
                            </div>
                          )
                        }}
                        panel={index}
                        currentPanel={currPan}
                        setCurrentPanel={setCurrPan}
                      />
                    </div>
                  ))
                }
                <FormBuilder
                  formItems={
                    newClientProps3(
                      {
                        formData,
                        handleBlur,
                        handleChange,
                        errors
                      }
                    )
                  }
                />
                <div>
                  <button type="button" onClick={addSub} className="simple-hover">Add Subsidiary</button>
                </div>
              </div>
            )
          }
        }
        panel={2}
        currentPanel={currentPanel}
        setCurrentPanel={setCurrentPanel}
      />
    </div>
  );
};
export default NewClientTemp2;
