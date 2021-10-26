import React from 'react';
import { user } from '../../utilities/auth';

const Dashboard = () => {
  const CompleteProfile = React.lazy(() => import('../authentication/CompleteProfile'));
  const NewEngagement = React.lazy(() => import('../authentication/NewEngagement'));
  const Engagements = React.lazy(() => import('../profile/Transactions'));

  const template = user.status === 'active'
    ? 'you are done'
    : <Engagements />;

  return (
    <div className="">
      {template}
    </div>
  );
};

export default Dashboard;
