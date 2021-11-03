import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PageTemp from '../../components/temps/PageTemp';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import ClientsTemp from './temps/ClientsTemp';
import IndexTemp from '../Dashboard/temp/IndexTemp';
import DashboardTable from '../../components/tables/dashboardTable';
import ClientsTable from '../../components/tables/clientsTable';

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
  const infoBarData = [
    {
      title: 'Total Clients',
      val: formData?.client_count || '0'
    },
    {
      title: 'Pending Conclusion',
      val: formData?.pending_engagement || '0'
    },
    {
      title: 'Concluded And Closed',
      val: formData?.concluded_engagement || '0'
    },
    {
      title: 'Total Client',
      val: formData?.clients_count || '0'
    }
  ];
  return (
    <PageTemp
      data={formData.clients}
      status={status}
      view={(
        <IndexTemp
          formData={formData}
          infoBarData={infoBarData}
          header="clients list"
          link={{ name: '+ new client', to: '/app/clients/new-client' }}
          parent="clients"
          table={<ClientsTable data={formData.clients} />}
        />
      )}
      action="CLIENTS_COMPLETE"
      retry={view}
    />
  );
};

export default ClientIndex;
