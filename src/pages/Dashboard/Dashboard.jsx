import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { user } from '../../utilities/auth';

const Dashboard = () => {
  const { push } = useHistory();
  const CompleteProfile = React.lazy(() => import('../authentication/CompleteProfile'));
  const NewEngagement = React.lazy(() => import('../authentication/NewEngagement'));
  const DashIndex = React.lazy(() => import('./DashboardIndex'));

  useEffect(() => user?.is_verified < 1 && push('/app/complete-registration'));
  return (
    <DashIndex />
  );
};

export default Dashboard;
