import React from 'react';
import { useSelector } from 'react-redux';
import PageTemp from '../../components/temps/PageTemp';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import IndexTemp from '../Dashboard/temp/IndexTemp';

const DashboardIndex = () => {
  const store = useSelector((state) => state.engagement.engagements);
  const [formData, setFormData] = React.useState({});

  const options = {
    action: 'ENGAGEMENTS',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENTS',
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
      action="ENGAGEMENTS_COMPLETE"
      retry={view}
      redirect={
        {
          link: '/app/engagement/new-engagement',
          name: 'engagements',
          text: 'Create engagement to see activities',
          title: 'No Data',
          btnName: 'Create Engagement'
        }
      }
    />
  );
};
export default DashboardIndex;
