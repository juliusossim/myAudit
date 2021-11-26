import React from 'react';
import { useSelector } from 'react-redux';
import PageTemp from '../../components/temps/PageTemp';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import IndexTemp from '../Dashboard/temp/IndexTemp';
import TeamTable from '../../components/tables/teamTable';

const TeamIndex = () => {
  const store = useSelector((state) => state.users?.users);
  const [formData, setFormData] = React.useState({});

  const options = {
    action: 'USERS',
    apiOpts: apiOptions({
      endpoint: 'USERS',
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
      title: 'Net Staff Power',
      val: formData?.users?.length || '0'
    },
    {
      title: 'Potential Staffs',
      val: formData?.pending_invitation || '0'
    },
    {
      title: 'Team',
      val: formData?.users?.length || '0'
    },
    {
      title: 'Available Positions',
      val: formData?.clients_count || '0'
    }
  ];

  return (
    <PageTemp
      status={status}
      data={formData?.users}
      view={(
        <IndexTemp
          formData={formData}
          infoBarData={infoBarData}
          header="registered staffs"
          link={{ name: '+ invite', to: '/app/team/invite-user' }}
          parent="team"
          table={<TeamTable data={formData.users} />}
        />
      )}
      action="USERS_COMPLETE"
      retry={view}
      redirect={
        {
          link: '/app/team/invite-user',
          name: 'team',
          text: 'Collaborate effectively with your team',
          title: 'No Team Member',
          btnName: 'Invite Colleague'
        }
      }
    />
  );
};
export default TeamIndex;
