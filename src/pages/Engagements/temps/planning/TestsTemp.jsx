import React, { useEffect, useState } from 'react';
import { last } from 'lodash';
import Box from '@material-ui/core/Box';
import FormBuilder from '../../../../components/form/builders/form';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import PlanningClasses from './PlanningClasses';
import userProps from '../../constants/usersProps';
import NewEngagementTemp from '../newEngagement/NewEngagementTemp';
import SliderSizes from '../../../../components/microComponents/slider';
import CustomAccordion from '../../../../components/ui/customAccordion';
import Creatable from '../../../../components/form/inputs/Creatable';
import planningProps from '../../constants/planningProps';
import { index } from '../../../../utilities/auth';
import { slugToString, stringDoesNotExist } from '../../../../utilities/stringOperations';
import { CheckboxField } from '../../../../components/form/inputs/Checkbox';
import { assertions } from '../../../../utilities/dummyData';
import CustomCheckbox from '../../../../components/form/inputs/CustomCheckbox';
import CheckboxComp from '../../../../components/ui/CheckboxComp';

const TestsTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, setErrors, handleChecked, blurHandler
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [procedures, setProcedures] = useState([1]);

  const addProcess = () => {
    const fun = () => setProcedures([...procedures, (last(procedures) + 1)]);
    blurHandler();
    setTimeout(fun(), 500);
  };

  return (
    <div className="w-750 ">

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100 px-5">
              <div className="px-3">
                <CustomAccordion
                  data={{
                    name: 'Test Name And Assertions',
                    details: (
                      <div>
                        <FormBuilder
                          formItems={
                            planningProps(
                              {
                                formData,
                                handleBlur,
                                handleChange,
                                errors
                              }
                            ).test
                          }
                        />
                        <div className="font-title-small text-theme">Assertions</div>
                        <div className="d-flex wrap justify-content-between">
                          {
                            assertions?.map((item) => (
                              <div className="col-md-6" key={item.name}>
                                <div className="d-flex">
                                  <CustomCheckbox
                                    key={item.name}
                                    label={slugToString(item.name)}
                                    name={item.name}
                                    handleChecked={handleChecked}
                                    className="w-100 neg-m-l-20 mt-4"
                                    checked={formData[item.name]}
                                  />
                                  <div className="neg-m-t-10">{slugToString(item.name)}</div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )
                  }}
                  setCurrentPanel={setCurrentPanel}
                  currentPanel={currentPanel}
                  panel={1}
                />
                <CustomAccordion
                  data={{
                    name: 'Test Procedures',
                    details: (
                      <div>
                        {
                          procedures?.map((item, key) => (
                            <div key={item}>
                              <DragNDropTemp
                                formData={formData}
                                setFormData={setFormData}
                                setErrors={setErrors}
                                name="description"
                                label="Description"
                                handleBlur={blurHandler}
                              />
                            </div>
                          ))
                        }
                        <button type="button" className="btn" onClick={addProcess}>Add Procedure</button>
                      </div>
                    )
                  }}
                  setCurrentPanel={setCurrentPanel}
                  currentPanel={currentPanel}
                  panel={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestsTemp;
