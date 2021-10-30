import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/microComponents/loader';
import { apiOptions } from '../../services/fetch';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import NewClientTemp from './temps/NewClient';

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

  /* redux */
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
    store,
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

  return (
    status === 'pending'
      ? <Loader />
      : (
        <NewClientTemp
          formData={formData}
          setFormData={setFormData}
          handleChecked={handleChecked}
          handleBlur={handleBlur}
          handleChange={handleChange}
          create={create}
          errors={errors}
        />
      )
  );
};

export default NewClients;
