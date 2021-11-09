import React, { useState } from 'react';
import NewClientBasicData from './NewClientBasicData';
import NewClientSubsidiaries from './NewClientSubsidiaries';
import NewClientDirectors from './NewClientDirectors';
import FormBuilder from '../../../../components/form/builders/form';
import newClientProps1 from '../../constants/directors';
import newClientProps2 from '../../constants/checkBoxes';

const NewClientTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, create, handleChecked, disabled
}) => {
  const [currentPanel, setCurrentPanel] = useState(1);
  return (
    <div className="w-600 ">
      <div className="px-3">
        <div className="font-regular text-theme-grey text-center">
          Fill the form below to create a client
        </div>
      </div>

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="col-md-10 offset-1 mt-2">
              <div className="">
                <NewClientBasicData
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  errors={errors}
                  handleBlur={handleBlur}
                  currentPanel={currentPanel}
                  setCurrentPanel={setCurrentPanel}
                />
              </div>
              <div className="">
                <NewClientDirectors
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  errors={errors}
                  handleBlur={handleBlur}
                  currentPanel={currentPanel}
                  setCurrentPanel={setCurrentPanel}
                />
              </div>
              <div className="">
                <FormBuilder
                  formItems={
                    newClientProps2(
                      {
                        formData,
                        handleBlur,
                        handleChecked,
                        errors
                      }
                    )
                  }
                />
              </div>
              <div className={formData.is_part_of_group === 1 ? '' : 'd-none'}>
                <NewClientSubsidiaries
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  errors={errors}
                  handleBlur={handleBlur}
                  currentPanel={currentPanel}
                  setCurrentPanel={setCurrentPanel}
                />
              </div>
              <div className="row justify-content-between">
                <div className="mt-md-1 font-small">
                  &nbsp;
                </div>
                <div className="my-3">
                  <button className="text-white btn" type="button" disabled={!disabled} onClick={create}>Create Client</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewClientTemp;
