import React from 'react';
import { useSelector } from 'react-redux';
import PageTemp from '../../components/temps/PageTemp';
import { apiOptions } from '../../services/fetch';
import IndexTemp from './temp/IndexTemp';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import DashboardTable from '../../components/tables/dashboardTable';

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

  const infoBarData = [
    {
      title: 'Total Engagement',
      val: formData?.engagement_count || '0'
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
      status={status}
      data={formData?.engagements}
      view={(
        <IndexTemp
          formData={formData}
          infoBarData={infoBarData}
          header="recent engagement"
          link={{ name: '+ new engagement', to: '/app/engagement/new-engagement' }}
          parent="engagement"
          table={<DashboardTable data={formData.engagements} />}
        />
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
