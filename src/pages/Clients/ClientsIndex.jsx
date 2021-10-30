import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PageTemp from '../../components/temps/PageTemp';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import ClientsTemp from './temps/ClientsTemp';

const ClientIndex = () => {
  const store = useSelector((state) => state.users?.clients);
  /* state */
  const [formData, setFormData] = useState({});

  const options = {
    action: 'CLIENTS',
    apiOpts: apiOptions({
      endpoint: 'CLIENTS',
      auth: true,
      method: 'get'
    })
  };
  const {
    view, status
  } = useViewBoilerPlate({
    setFormData,
    formData,
    store,
    options
  });
  return (
    <PageTemp
      data={formData.clients}
      status={status}
      view={(
        <ClientsTemp formData={formData.clients} />
      )}
      action="CLIENTS_COMPLETE"
      retry={view}
    />
  );
};

export default ClientIndex;
