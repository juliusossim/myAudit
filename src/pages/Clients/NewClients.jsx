import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { apiOptions } from '../../services/fetch';
import { projectAction } from '../../redux/actions/projectActions';
import NewClientTemp from './temps/newClients/NewClientTemp';

const NewClient = () => {
  const dispatch = useDispatch();
  /* state */
  const [formData, setFormData] = useState({
    year: new Date(),
    subsidiary_name_main: [],
    subsidiary_nature_of_business_main: [],
    subsidiary_nature_main: [],
    subsidiary_percentage_holding_main: []
  });
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [currentName, setCurrentName] = useState(0);
  const [clients, setClients] = useState([]);
  const [uploads, setUploads] = useState({});

  /* redux */
  const store = useSelector((state) => state.engagement);
  const store2 = useSelector((state) => state.users);
  const options = {
    action: 'CREATE_ENGAGEMENT',
    apiOpts: apiOptions({
      body: { ...formData, ...uploads, year: new Date(formData.year).getFullYear().toString() },
      endpoint: 'CREATE_ENGAGEMENT',
      auth: true,
      method: 'post'
    })
  };
  const {
    handleBlur, handleChange, status, handleChecked, create, data, backErrors, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store: store.engagement,
    setProgress,
    setCurrentName,
    action: 'CREATE_ENGAGEMENT',
    redirect: '/app/engagements'
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
                clients={clients}
              />
            )
        }
      </div>
    </div>
  );
};

export default NewClient;
