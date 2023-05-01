import React, { useEffect, useState } from 'react';
import { last } from 'lodash';
import { BsArrowsCollapse, GiExpand, MdDone } from 'react-icons/all';
import { notifier, slugToString, stringDoesNotExist } from '../../../utilities/stringOperations';
import CustomAccordion from '../../../components/ui/customAccordion';
import DragNDropTemp from './newEngagement/DragNDropInputTemp';
import { QuillEditor } from '../../../components/ui/richText';
import { executions } from '../../../utilities/dummyData';

const ExecutionTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, setErrors, blurHandler
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [currentPanel1, setCurrentPanel1] = useState(50);
  const [procedures, setProcedures] = useState([1]);
  const name = (item) => `Assessment ${item}`;

  const addProcess = () => {
    const fun = () => setProcedures([...procedures, (last(procedures) + 1)]);
    blurHandler();
    if (
      stringDoesNotExist(formData.IT_name)
      || stringDoesNotExist(formData.function) || stringDoesNotExist(formData.review_performed)
    ) {
      return notifier({
        text: 'You have to fill every field in this form before adding a new entry',
        title: 'Unfilled/Incomplete Form',
        type: 'info'
      });
    }
    return setTimeout(fun(), 500);
  };

  return (
    <div className="w-750 ">

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100 px-5">
              <div className="px-3">
                <div>
                  {
                    executions?.map((item, key) => (
                      <div key={item}>
                        <CustomAccordion
                          data={{
                            name: slugToString(item),
                            details: (
                              <DragNDropTemp
                                formData={formData}
                                setFormData={setFormData}
                                setErrors={setErrors}
                                name={item}
                                // label={slugToString(item)}
                                handleBlur={blurHandler}
                              />
                            )
                          }}
                          setCurrentPanel={setCurrentPanel}
                          currentPanel={currentPanel}
                          panel={key}
                          expand={stringDoesNotExist(formData[item])
                            ? <GiExpand /> : <MdDone className="text-theme" />}
                          collapse={<BsArrowsCollapse />}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExecutionTemp;
