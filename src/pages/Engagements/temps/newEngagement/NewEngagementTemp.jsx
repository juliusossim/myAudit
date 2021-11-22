import React, { useState } from 'react';
import uuid from 'react-uuid';
import FormBuilder from '../../../../components/form/builders/form';
import newEngagementProps from '../../constants/newEngagement';
import DragNDropTemp from './DragNDropInputTemp';
import CustomAccordion from '../../../../components/ui/customAccordion';
import { CheckboxField } from '../../../../components/form/inputs/Checkbox';

const NewEngagementTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, handleChecked, setErrors,
  create, removeItem, loadingMedia, progress, uploads, handleDateChange, setProgress
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  return (
    <div className="w-600 ">
      <div className="px-3">
        <div className="font-regular text-theme-grey text-center">
          Fill the form below to start the engagement process
        </div>
      </div>

      <div className="box-shadow row ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100">
              <CustomAccordion
                data={
                  {
                    name: 'Audit Basic Info',
                    details: (
                      <div className="d-flex wrap justify-content-between">
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
                                handleDateChange
                              }
                            )
                          }
                        />
                        <div className="my-1 w-100">
                          <DragNDropTemp
                            formData={formData}
                            setFormData={setFormData}
                            setErrors={setErrors}
                            name="engagement_letter"
                            label="Engagement Letter"
                          />
                          <div className="d-flex ml-3">
                            <CheckboxField
                              label="Audit Requires External Expert"
                              name="external_expert"
                              handleChecked={handleChecked}
                              className="w-100 neg-m-l-20 col-md-6 mt-3"
                              checked={formData?.external_expert}
                            />
                            <CheckboxField
                              label="Client Have Audit History"
                              name="first_time"
                              handleChecked={handleChecked}
                              className="w-100 neg-m-l-20 col-md-6 mt-3"
                              checked={formData?.is_public_entity}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  }
                }
                panel={0}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
              />
            </div>
            <div className={formData.first_time === 1 ? 'margin-auto w-100' : 'd-none'}>
              <div className="margin-auto w-100">
                <CustomAccordion
                  data={
                    {
                      name: 'Letters',
                      details: (
                        <div className="">
                          <div className="" style={{ margin: 'auto' }}>
                            <div className="my-1">
                              <DragNDropTemp
                                setErrors={setErrors}
                                formData={formData}
                                setFormData={setFormData}
                                name="appointment_letter"
                                label="Appointment Letter"
                              />
                            </div>
                            <div className="my-1">
                              <DragNDropTemp
                                setErrors={setErrors}
                                formData={formData}
                                setFormData={setFormData}
                                name="previous_year_management_letter"
                                label="Previous Year Management Letter"
                              />
                            </div>
                          </div>
                        </div>
                      )
                    }
                  }
                  panel={1}
                  currentPanel={currentPanel}
                  setCurrentPanel={setCurrentPanel}
                />
              </div>
              <div className="margin-auto w-100">
                <CustomAccordion
                  data={
                    {
                      name: 'Audit History',
                      details: (
                        <div className="">
                          <div className="" style={{ margin: 'auto' }}>
                            <div className="my-1">
                              <DragNDropTemp
                                setErrors={setErrors}
                                formData={formData}
                                setFormData={setFormData}
                                name="contacted_previous_auditor"
                                label="Previous Auditors"
                              />
                            </div>
                            <div className="my-1">
                              <DragNDropTemp
                                setErrors={setErrors}
                                formData={formData}
                                setFormData={setFormData}
                                name="previous_auditor_response"
                                label="Previous Auditor Response"
                              />
                            </div>
                            <div className="my-1">
                              <DragNDropTemp
                                formData={formData}
                                setFormData={setFormData}
                                setErrors={setErrors}
                                name="other_audit_opinion"
                                label="Other Audit Opinion"
                              />
                            </div>
                            <div className="my-1">
                              <DragNDropTemp
                                formData={formData}
                                setFormData={setFormData}
                                setErrors={setErrors}
                                name="previous_year_asf"
                                label="Previous Year ASF"
                              />
                            </div>

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
              <div className="margin-auto w-100">
                <CustomAccordion
                  data={
                    {
                      name: 'Audit Review',
                      details: (
                        <div className="">
                          <div className="" style={{ margin: 'auto' }}>
                            <div className="my-1">
                              <DragNDropTemp
                                formData={formData}
                                setFormData={setFormData}
                                setErrors={setErrors}
                                name="previous_audit_review"
                                label="Previous Audit Review"
                              />
                            </div>
                            <div className="my-1">
                              <DragNDropTemp
                                formData={formData}
                                setFormData={setFormData}
                                setErrors={setErrors}
                                name="previous_audit_opinion"
                                label="Previous Auditor Opinion"
                              />
                            </div>

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
            </div>

            <div className="row justify-content-between">
              <div className="mt-md-1 font-small">
                &nbsp;
              </div>
              <div className="p-3">
                <button className=" btn" type="button" onClick={create}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewEngagementTemp;
