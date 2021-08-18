import React, {
  Suspense, useCallback, useEffect
} from 'react';
import { Switch, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import MainPortal from './routes/MainPortal';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Loader from './components/microComponents/loader';
import { projectAction, projectCategories } from './redux/actions/projectActions';

function App() {
  const dispatch = useDispatch();
  const apiMethod = (
    {
      method: 'get',
      options: {
        endpoint: 'STATE_LGAS'
      }
    }
  );
  const getStateLgas = useCallback(() => dispatch(projectAction(
    { action: apiMethod.options.endpoint, routeOptions: apiMethod }
  )), []);
  useEffect(() => {
    getStateLgas();
    dispatch(projectCategories());
  }, []);
  return (
    <Suspense fallback={(
      <div style={{
        height: '50vh',
        width: '50vw',
        left: '45vw',
        top: '20vh'
      }}
      >
        <Loader />
      </div>
    )}
    >

      {/* <Router history={history}> */}
      <div className="w-full wrapper">
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
