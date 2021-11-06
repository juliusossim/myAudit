import React, { useState } from 'react';
import NewClientTemp1 from './NewClientTemp1';
import NewClientTemp3 from './NewClientTemp3';
import NewClientTemp2 from './NewClientTemp2';
import FormBuilder from '../../../../components/form/builders/form';
import newClientProps1 from '../../constants/newClients1';
import newClientProps2 from '../../constants/newClients2';

const NewClientTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, create, handleChecked
}) => {
  const [currentPanel, setCurrentPanel] = useState(1);
  return (
    <div className="w-600 ">
      <div className="px-3">
        <div className="font-regular text-theme-grey text-center">
          Fill the form below to create a client
        </div>
      </div>

      <div className="box-shadow row ">
        <div className="pt-5">
          <div className="row">
            <div className="col-md-10 offset-1 mt-2">
              <div className="">
                <NewClientTemp1
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
                <NewClientTemp2
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
                <NewClientTemp3
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
                  <button className=" btn" type="button" onClick={create}>Create Client</button>
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
