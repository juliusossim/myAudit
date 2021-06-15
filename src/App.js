import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPortal from './routes/MainPortal';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  return (

    <Suspense fallback={(
      <div className="loader-container">
        <div className="loader">
          <i />
        </div>
      </div>
    )}
    >

      {/* <Router history={history}> */}
      <div className="w-full">
        <Header />
        <Switch>

          {/* <Route path="/" component={HomePortal} /> */}
          <Route path="/" component={MainPortal} />

          <Route render={() => <h1>Error 404. Page not found.</h1>} />
        </Switch>
        <Footer />
      </div>
      {/* </Router> */}
    </Suspense>

  );
}

export default App;
