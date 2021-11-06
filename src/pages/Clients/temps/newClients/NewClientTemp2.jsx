import React, { useState } from 'react';
import FormBuilder from '../../../../components/form/builders/form';
import newClientProps1 from '../../constants/newClients1';
import CustomAccordion from '../../../../components/ui/customAccordion';

const NewClientTemp2 = ({
  formData, setFormData, handleChange, errors, handleBlur, currentPanel, setCurrentPanel
}) => {
  const [subsidiaries, setSubsidiaries] = useState([]);
  const [currPan, setCurrPan] = useState(0);
  const addSub = () => {
    setSubsidiaries([
      ...subsidiaries,
      {
        director_name_main: formData.director_name_alt,
        director_units_held_main: formData.director_units_held_alt,
        director_designation_main: formData.director_designation_alt
      }
    ]);
    setFormData({
      ...formData,
      director_name: [...formData.director_name, formData.director_name_alt],
      director_units_held:
        [
          ...formData.director_units_held,
          formData.director_units_held_alt
        ],
      director_designation:
        [...formData.director_designation, formData.director_designation_alt],
      director_name_alt: '',
      director_units_held_alt: '',
      director_designation_alt: ''
    });
  };
  return (
    <div className="">
      <CustomAccordion
        data={
          {
            name: 'Directors',
            details: (
              <div className="">
                {
                  subsidiaries.map((item, index) => (
                    <div className="px-5">
                      <CustomAccordion
                        data={{
                          name: <div className="text-theme-blue">{item.director_name_main}</div>,
                          details: (
                            <div>
                              <p>{`Shares: ${item.director_units_held_main} %`}</p>
                              <p>{`Designation: ${item.director_designation_main}`}</p>
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
                    newClientProps1(
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
                  <button type="button" onClick={addSub} className="simple-hover btn text-white">Add Director</button>
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
