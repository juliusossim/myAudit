import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { apiOptions } from '../../services/fetch';
import NewClientTemp from './temps/newClients/NewClientTemp';
import { checkRequiredFields } from '../../utilities/validation';

const NewClient = () => {
  /* state */
  const [formData, setFormData] = useState({
    is_part_of_group: 0,
    is_public_entity: 0,
    subsidiary_name: [],
    subsidiary_nature_of_business: [],
    subsidiary_nature: [],
    subsidiary_percentage_holding: [],
    director_name: [],
    director_units_held: [],
    director_designation: []
  });
  const [errors, setErrors] = useState({});
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    if (formData.is_part_of_group === 0) {
      setSubmittable(checkRequiredFields([
        formData.director_name,
        formData.director_units_held,
        formData.director_designation,
        formData.nature_of_business,
        formData.phone,
        formData.email,
        formData.address,
        formData.registered_address,
        formData.doubts
      ]));
    } else {
      setSubmittable(checkRequiredFields([
        formData.director_name,
        formData.director_units_held,
        formData.director_designation,
        formData.nature_of_business,
        formData.phone,
        formData.email,
        formData.address,
        formData.registered_address,
        formData.doubts,
        formData.subsidiary_nature_of_business,
        formData.subsidiary_nature,
        formData.subsidiary_percentage_holding
      ]));
    }
  }, [formData]);
  /* redux */
  const store = useSelector((state) => state.users.newClient);

  const options = () => {
    const opt = {};
    if (formData.is_part_of_group === 0) {
      opt.subsidiary_nature_of_business = [];
      opt.subsidiary_nature = [];
      opt.subsidiary_percentage_holding = [];
    }
    return (
      {
        action: 'CREATE_CLIENT',
        apiOpts: apiOptions({
          body: { ...formData, ...opt },
          endpoint: 'CREATE_CLIENT',
          auth: true,
          method: 'post'
        })
      }
    );
  };
  const {
    handleBlur, handleChange, status, handleChecked, create, data, backErrors, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options: options(),
    store,
    action: 'CREATE_CLIENT_COMPLETE',
    redirect: '/app/clients'
  });

  return (
    <div className="">
      <div className="d-flex ml-4 custom-top-bar justify-content-between">
        <div className="text-theme-black bold">
          CLIENTS
        </div>
        <div>
          <Link to="/app/clients/" className="text-theme-blue mr-1">Clients</Link>
          <span className="text-theme-black">/ New Client</span>
        </div>
      </div>
      <div className="content">
        {
          status === 'pending'
            ? <Loader />
            : (
              <NewClientTemp
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleChecked={handleChecked}
                create={create}
                disabled={submittable}
              />
            )
        }
      </div>
    </div>
  );
};

export default NewClient;
