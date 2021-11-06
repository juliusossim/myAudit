import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import uuid from 'react-uuid';
import { AiOutlineDelete, AiOutlineExpandAlt, BsArrowsAngleContract } from 'react-icons/all';
import FormBuilder from '../../../../components/form/builders/form';
import newClientDirectorsProps from '../../constants/directors';
import CustomAccordion from '../../../../components/ui/customAccordion';
import { checkRequiredFields } from '../../../../utilities/validation';

const NewClientDirectors = ({
  formData, setFormData, handleChange, errors, handleBlur, currentPanel, setCurrentPanel
}) => {
  const [clients, setClients] = useState([]);
  const [currPan, setCurrPan] = useState(0);
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    setSubmittable(checkRequiredFields([
      formData.director_name_alt,
      formData.director_units_held_alt,
      formData.director_designation_alt
    ]));
  }, [formData]);

  const addSub = () => {
    setClients([
      ...clients,
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
  const removeSub = (e, item) => {
    e.stopPropagation();
    const newArr = filter(clients, (sub) => sub !== item);
    const nam = [];
    const uni = [];
    const des = [];
    newArr.map((arr) => {
      nam.push(arr.director_name_main);
      uni.push(arr.director_units_held_main);
      des.push(arr.director_designation_main);
      return arr;
    });
    setFormData({
      ...formData,
      director_name: nam,
      director_units_held: uni,
      director_designation: des
    });
    setClients(newArr);
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
                  clients.map((item, index) => (
                    <div className="px-5" key={uuid()}>
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
                      newClientDirectorsProps(
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
                  <button type="button" disabled={!submittable} onClick={addSub} className="simple-hover btn text-white">Add Director</button>
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
export default NewClientDirectors;
