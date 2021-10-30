import React from 'react';
import { useSelector } from 'react-redux';
import PageTemp from '../../components/temps/PageTemp';
import { apiOptions } from '../../services/fetch';
import IndexTemp from './temp/IndexTemp';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';

const DashboardIndex = () => {
  const store = useSelector((state) => state.engagement.dashboard);
  const [formData, setFormData] = React.useState({});

  const options = {
    action: 'DASHBOARD',
    apiOpts: apiOptions({
      endpoint: 'DASHBOARD',
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
      status={status}
      data={formData?.engagements}
      view={(
        <IndexTemp formData={formData} />
      )}
      action="DASHBOARD_COMPLETE"
      retry={view}
      redirect={
        {
          link: '/app/engagement/new-engagement',
          name: 'dashboard',
          text: 'Create engagement to see activities',
          title: 'No Data',
          btnName: 'Create Engagement'
        }
      }
    />
  );
};
export default DashboardIndex;
