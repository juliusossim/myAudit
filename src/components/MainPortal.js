import React from 'react';
import { Route } from 'react-router-dom';

import portalRoutes from './routes/portal.routes';

import Header from './common/layouts/Header';
import Footer from './common/layouts/Footer';

function MainPortal() {
  return (
    <div className="w-full">
      <Header />
      <main>
        {portalRoutes?.map(({ exact, path, component }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default MainPortal;
