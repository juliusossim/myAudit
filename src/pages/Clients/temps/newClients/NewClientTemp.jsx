import React, { useState } from 'react';
import NewClientTemp1 from './NewClientTemp1';
import NewClientTemp2 from './NewClientTemp2';

const NewClientTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, create
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
