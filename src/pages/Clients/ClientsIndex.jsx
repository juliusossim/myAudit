import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTemp from '../../components/temps/PageTemp';
import { apiOptions } from '../../services/fetch';

import ClientsTemp from './Temps/ClientsTemp';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';

const DashboardIndex = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.engagement?.engagement);
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
    dispatch,
    store,
    options
  });

  return (
    <PageTemp
      data={formData.clients}
      status={status}
      view={(
        <ClientsTemp formData={formData} />
      )}
      action="ENGAGEMENT_COMPLETE"
      retry={view}
    />
  );
};

export default DashboardIndex;
