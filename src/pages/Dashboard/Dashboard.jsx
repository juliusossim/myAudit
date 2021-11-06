import React, { useEffect } from 'react';
import { isNull } from 'lodash';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { user } from '../../utilities/auth';

const Dashboard = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const path = (route) => pathname.startsWith(route);
  useEffect(() => {
    if (isNull(user.company_id)) {
      push('/app/dashboard/complete-registration');
    }
  }, []);
  const DashIndex = React.lazy(() => import('./DashboardIndex'));

  return (
    <DashIndex />
  );
};

export default Dashboard;
