import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { user } from '../../utilities/auth';

const Dashboard = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const path = (route) => pathname.startsWith(route);
  useEffect(() => {
    if (user?.is_verified === 0) {
      push('/app/dashboard/complete-registration');
    }
  }, []);
  const DashIndex = React.lazy(() => import('./DashboardIndex'));

  return (
    <DashIndex />
  );
};

export default Dashboard;
