import React from 'react';
import { Route } from 'react-router-dom';

import portalRoutes from './portal.routes';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

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
