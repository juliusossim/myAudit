import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import uuid from 'react-uuid';
import { AiOutlineDelete, AiOutlineExpandAlt, BsArrowsAngleContract } from 'react-icons/all';
import FormBuilder from '../../../../components/form/builders/form';
import newClientSubsidiariesProps from '../../constants/subsidiaries';
import CustomAccordion from '../../../../components/ui/customAccordion';
import { checkRequiredFields } from '../../../../utilities/validation';

const NewClientSubsidiaries = ({
  formData, setFormData, handleChange, errors, handleBlur, currentPanel, setCurrentPanel
}) => {
  const [subsidiaries, setSubsidiaries] = useState([]);
  const [currPan, setCurrPan] = useState(1);
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    setSubmittable(checkRequiredFields([
      formData.subsidiary_name_alt,
      formData.subsidiary_nature_of_business_alt,
      formData.subsidiary_nature_alt,
      formData.subsidiary_percentage_holding_alt
    ]));
  }, [formData]);

  const addSub = () => {
    setSubsidiaries([
      ...subsidiaries,
      {
        subsidiary_name_main: formData.subsidiary_name_alt,
        subsidiary_nature_of_business_main: formData.subsidiary_nature_of_business_alt,
        subsidiary_nature_main: formData.subsidiary_nature_alt,
        subsidiary_percentage_holding_main: formData.subsidiary_percentage_holding_alt
      }
    ]);
    setFormData({
      ...formData,
      subsidiary_name: [...formData.subsidiary_name, formData.subsidiary_name_alt],
      subsidiary_nature_of_business:
        [
          ...formData.subsidiary_nature_of_business,
          formData.subsidiary_nature_of_business_alt
        ],
      subsidiary_nature: [...formData.subsidiary_nature, formData.subsidiary_nature_alt],
      subsidiary_percentage_holding:
        [
          ...formData.subsidiary_percentage_holding,
          formData.subsidiary_percentage_holding_alt
        ],
      subsidiary_name_alt: '',
      subsidiary_nature_of_business_alt: '',
      subsidiary_nature_alt: '',
      subsidiary_percentage_holding_alt: ''
    });
  };
  const removeSub = (e, item) => {
    e.stopPropagation();
    const newArr = filter(subsidiaries, (sub) => sub !== item);
    const nam = [];
    const natB = [];
    const nat = [];
    const uni = [];
    newArr.map((arr) => {
      nam.push(arr.subsidiary_name_main);
      natB.push(arr.subsidiary_nature_of_business_main);
      nat.push(arr.subsidiary_nature_main);
      uni.push(arr.subsidiary_percentage_holding_main);
      return arr;
    });
    setFormData({
      ...formData,
      subsidiary_name: nam,
      subsidiary_nature_of_business: natB,
      subsidiary_nature: nat,
      subsidiary_percentage_holding: uni
    });
    setSubsidiaries(newArr);
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
                    <div className="px-5" key={uuid()}>
                      <CustomAccordion
                        data={{
                          name: <div className="text-theme-blue">{item.subsidiary_name_main}</div>,
                          details: (
                            <div>
                              <p>{`Nature: ${item.subsidiary_nature_main}`}</p>
                              <p>{`Business Nature: ${item.subsidiary_nature_of_business_main}`}</p>
                              <p>{`Percentage Holding: ${item.subsidiary_percentage_holding_main}`}</p>
                            </div>
                          )
                        }}
                        panel={index}
                        currentPanel={currPan}
                        setCurrentPanel={setCurrPan}
                        removeAccordion={(
                          <button type="button" onClick={(e) => removeSub(e, item)} className="btn-del border-radius-5 text-white">
                            <AiOutlineDelete />
                          </button>
                        )}
                        expand={<AiOutlineExpandAlt />}
                        collapse={<BsArrowsAngleContract />}
                      />
                    </div>
                  ))
                }
                <div className="d-flex wrap justify-content-between">
                  <FormBuilder
                    formItems={
                      newClientSubsidiariesProps(
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
                <div>
                  <button type="button" disabled={!submittable} onClick={addSub} className="simple-hover btn text-white">Ok</button>
                </div>
              </div>
            )
          }
        }
        panel={3}
        currentPanel={currentPanel}
        setCurrentPanel={setCurrentPanel}
      />
    </div>
  );
};
export default NewClientSubsidiaries;
