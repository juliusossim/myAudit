import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import FormBuilder from '../../../components/form/builders/form';

const NewClientTemp = ({
  formData,
  table,
  create,
  link
}) => (
  <div className="">
    <div className="d-flex ml-4 custom-top-bar pb-5 justify-content-between">
      <div className="text-theme-black bold">
        Clients
      </div>
      <div>
        <Link className="mx-1 text-theme-blue" to="/app/clients">Clients</Link>
        <span className="text-theme-black">/ New Client</span>
      </div>
    </div>
    <div className="content">
      <div className="w-600">
        <div className="px-3">
          <div className="font-regular text-theme-grey text-center pb-3">
            Fill the form below to register a client
          </div>
        </div>
        <div className="box-shadow row ">
          <div className="pt-5">
            <div className="row">
              <div className="col-md-10 offset-1 mt-2">
                <div className="row">
                  {table}
                </div>
                <div className="row justify-content-between pb-5">
                  <div>&nbsp;</div>
                  <div>
                    {
                      _.isEmpty(link)
                        ? <Link to={link?.to}>{link.name}</Link>
                        : <button className="w-100 btn" type="button" onClick={() => create(formData)}>Submit Client</button>
                    }
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
