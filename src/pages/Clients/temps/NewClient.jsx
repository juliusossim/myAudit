import React from 'react';
import { Link } from 'react-router-dom';
import FormBuilder from '../../../components/form/builders/form';
import newClientProps from '../constants/newClients';

const NewClientTemp = ({
  formData,
  handleBlur,
  handleChange,
  errors,
  handleChecked,
  setFormData,
  create
}) => (
  <div className="">
    <div className="d-flex ml-4 custom-top-bar justify-content-between">
      <div className="text-theme-black bold">
        Clients
      </div>
      <div>
        <Link className="mx-1 text-theme-blue" to={{ pathname: '/app/clients', name: 'clients' }}>Clients</Link>
        <span className="text-theme-black">/ New Client</span>
      </div>
    </div>
    <div className="content">
      <div className="w-600 ">
        <div className="px-3">
          <div className="font-regular text-theme-grey text-center">
            Fill the form below to register a client
          </div>
        </div>
        <div className="box-shadow row ">
          <div className="pt-5">
            <div className="row">
              <div className="col-md-10 offset-1 mt-2">
                <div className="row">
                  <FormBuilder
                    formItems={
                      newClientProps(
                        {
                          formData,
                          handleBlur,
                          handleChange,
                          errors,
                          handleChecked,
                          setFormData
                        }
                      )
                    }
                  />
                </div>
                <div className="row justify-content-between">
                  <div>&nbsp;</div>
                  <div>
                    <button className="w-100 btn" type="button" onClick={() => create(formData)}>Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default NewClientTemp;
