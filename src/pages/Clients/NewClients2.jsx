import React from 'react';
import Loader from '../../components/microComponents/loader';
import NewClientTemp from './temps/NewClient';
import newClientProps2 from './constants/newClients2';

const NewClients1 = ({
  status,
  formData,
  create,
  handleBlur,
  handleChange,
  errors,
  handleChecked,
  setFormData
}) => (
  status === 'pending'
    ? <Loader />
    : (
      <NewClientTemp
        formData={formData}
        create={create}
        link="/app/clients/new-client/directors"
        table={newClientProps2(
          {
            formData,
            handleBlur,
            handleChange,
            errors,
            handleChecked,
            setFormData
          }
        )}
      />
    )
);

export default NewClients1;
