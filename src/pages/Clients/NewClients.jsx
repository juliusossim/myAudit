import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import FormBuilder from '../../components/form/builders/form';
import newClientProps from './constants/newClients';
import Loader from '../../components/microComponents/loader';
import { apiOptions } from '../../services/fetch';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';

const NewClients = () => {
  const [formData, setFormData] = useState(
    {
      is_part_of_group: 0,
      is_public_entity: 0,
      subsidiary_nature: [],
      director_name: [],
      director_units_held: [],
      subsidiary_name: [],
      subsidiary_nature_of_business: [],
      director_designation: [],
      subsidiary_percentage_holding: []
    }
  );
  const [errors, setErrors] = useState({});

  const { push } = useHistory();

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users.newClient);
  const options = {
    action: 'CREATE_CLIENT',
    apiOpts: apiOptions({
      body: formData,
      endpoint: 'CREATE_CLIENT',
      auth: true,
      method: 'post'
    })
  };
  const {
    handleBlur, handleChange, create, status, handleChecked
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    dispatch,
    store,
    push,
    options,
    redirect: '/app/clients'
  });
  useEffect(() => {
    if (!formData.is_public_entity) {
      setFormData({
        ...formData,
        subsidiary_nature_of_business: [],
        subsidiary_percentage_holding: [],
        subsidiary_name: []
      });
    }
  }, [formData.is_public_entity]);

  /* on visiting */
  const initialTemp = (
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
  );

  return (
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
        {
          status === 'pending'
            ? <Loader />
            : (initialTemp)
        }
      </div>
    </div>
  );
};

export default NewClients;
