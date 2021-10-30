import React from 'react';

const Dashboard = () => {
  const DashIndex = React.lazy(() => import('./DashboardIndex'));

  return (
    <DashIndex />
  );
};

export default Dashboard;
