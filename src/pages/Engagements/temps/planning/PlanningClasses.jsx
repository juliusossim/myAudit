import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import uuid from 'react-uuid';
import { AiOutlineDelete, AiOutlineExpandAlt, BsArrowsAngleContract } from 'react-icons/all';
import FormBuilder from '../../../../components/form/builders/form';
import CustomAccordion from '../../../../components/ui/customAccordion';
import { checkRequiredFields } from '../../../../utilities/validation';
import planningProps from '../../constants/planningProps';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';

const PlanningClasses = ({
  formData, setFormData, handleChange, errors,
  handleBlur, currentPanel, setCurrentPanel, progress, setProgress
}) => {
  const [engagementClasses, setEngagementClasses] = useState([]);
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    setSubmittable(checkRequiredFields([
      formData.process_flow_document,
      formData.name
    ]));
  }, [formData]);

  useEffect(() => {
    setFormData({
      ...formData,
      classes: engagementClasses
    });
  }, [engagementClasses]);

  const addSub = () => {
    setEngagementClasses([
      ...engagementClasses,
      {
        name: formData.name,
        process_flow_document: formData.process_flow_document
      }
    ]);
    setFormData({
      ...formData,
      process_flow_document: '',
      name: ''
    });
  };
  const removeSub = (e, item) => {
    e.stopPropagation();
    const newArr = filter(engagementClasses, (sub) => sub !== item);
    setEngagementClasses(newArr);
  };
  return (
    <div className="">
      <CustomAccordion
        data={
          {
            name: 'Transaction Class',
            details: (
              <div className="">
                {
                  engagementClasses.map((item, index) => (
                    <div className="px-5" key={uuid()}>
                      <div className="text-theme-blue">{item.name}</div>
                      <div>
                        <p>Process Flow Document</p>
                        <p>{item.process_flow_document}</p>
                      </div>

                      <button type="button" onClick={(e) => removeSub(e, item)} className="btn-del border-radius-5 text-white">
                        <AiOutlineDelete />
                      </button>

                    </div>
                  ))

                }
                <div className="">
                  <FormBuilder
                    formItems={
                      planningProps(
                        {
                          formData,
                          handleBlur,
                          handleChange,
                          errors
                        }
                      )
                    }
                  />
                  <div className="px-2">
                    <DragNDropTemp
                      formData={formData}
                      setFormData={setFormData}
                      seProgress={setProgress}
                      progress={progress}
                      name="process_flow_document"
                      label="Process Flow Document"
                    />
                  </div>
                </div>
                <div>
                  <button type="button" disabled={!submittable} onClick={addSub} className="simple-hover btn text-white">Add Class</button>
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
export default PlanningClasses;
