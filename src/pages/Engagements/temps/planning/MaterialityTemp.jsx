import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import FormBuilder from '../../../../components/form/builders/form';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import PlanningClasses from './PlanningClasses';
import userProps from '../../constants/usersProps';
import NewEngagementTemp from '../newEngagement/NewEngagementTemp';
import SliderSizes from '../../../../components/microComponents/slider';
import CustomAccordion from '../../../../components/ui/customAccordion';

const MaterialityTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, setErrors,
  create, status, link, message
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <div className="w-750 ">

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100 px-5">
              <div className="px-3">
                <CustomAccordion
                  data={{
                    name: 'Materiality Benchmark',
                    details: (
                      <div>
                        <DragNDropTemp
                          formData={formData}
                          setFormData={setFormData}
                          setErrors={setErrors}
                          name="materiality_benchmark_reason"
                          label="Benchmark Purpose"
                        />
                        <SliderSizes
                          max={10000000}
                          formData={formData}
                          setFormData={setFormData}
                          label="Benchmark Amount"
                          name="materiality_benchmark_amount"
                          props={{
                            errors, setErrors, placeholder: 'Enter Amount'
                          }}
                        />
                      </div>
                    )
                  }}
                  setCurrentPanel={setCurrentPanel}
                  currentPanel={currentPanel}
                  panel={1}
                />

                <CustomAccordion
                  data={{
                    name: 'Overall Materiality',
                    details: (
                      <div>
                        <DragNDropTemp
                          formData={formData}
                          setFormData={setFormData}
                          setErrors={setErrors}
                          name="overall_materiality_reason"
                          label="Purpose"
                        />
                        <SliderSizes
                          max={10000000}
                          formData={formData}
                          setFormData={setFormData}
                          label="Amount"
                          name="overall_materiality_amount"
                          props={{
                            errors, setErrors, placeholder: 'Enter Amount'
                          }}
                        />
                        <SliderSizes
                          max={10000000}
                          formData={formData}
                          setFormData={setFormData}
                          label="Level"
                          name="overall_materiality_level_id"
                          props={{
                            errors, setErrors, placeholder: 'Enter Amount'
                          }}
                        />
                        <SliderSizes
                          max={10000000}
                          formData={formData}
                          setFormData={setFormData}
                          label="Limit"
                          name="overall_materiality_limit"
                          props={{
                            errors, setErrors, placeholder: 'Enter Amount'
                          }}
                        />
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
export default MaterialityTemp;
