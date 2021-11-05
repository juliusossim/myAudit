import React from 'react';
import FormBuilder from '../../../components/form/builders/form';
import newEngagementProps from '../constants/newEngagement';

const NewEngagementTemp = ({
  formData, handleChange, errors, handleBlur, handleChecked,
  create, removeItem, loadingMedia, progress, uploads, clients, handleDateChange
}) => (
  <div className="w-600 ">
    <div className="px-3">
      <div className="font-regular text-theme-grey text-center">
        Fill the form below to start the engagement process
      </div>
    </div>

    <div className="box-shadow row ">
      <div className="pt-5">
        <div className="row">
          <div className="col-md-10 offset-1 mt-2">
            <div className="row">
              <FormBuilder
                formItems={
                  newEngagementProps(
                    {
                      formData,
                      handleBlur,
                      handleChange,
                      errors,
                      multiple: true,
                      removeItem,
                      progress,
                      loadingMedia,
                      handleChecked,
                      uploads,
                      handleDateChange,
                      clients
                    }
                  )
                }
              />
            </div>
            <div className="row justify-content-between">
              <div className="mt-md-1 font-small">
                &nbsp;
              </div>
              <div>
                <button className=" btn" type="button" onClick={create}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default NewEngagementTemp;
