import React, {
  Suspense, useCallback, useEffect
} from 'react';
import {
  Switch, Route, useLocation
} from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import MainPortal from './routes/MainPortal';
import Header from './layouts/Header';
import Loader from './components/microComponents/loader';
import ScrollUpBtn from './layouts/ScrollUpBtn';
import Footer from './layouts/Footer';
import { apiOptions } from './services/fetch';
import { projectAction } from './redux/actions/projectActions';

function App() {
  /* redux hooks */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.engagement?.index);

  const { pathname } = useLocation();
  const [pad] = React.useState(null);
  const indexData = { ...JSON.parse(localStorage.getItem('index')) };

  const index = useCallback(() => dispatch(projectAction(
    {
      action: 'INDEX',
      routeOptions: apiOptions({
        method: 'get',
        auth: true,
        endpoint: 'INDEX'
      })
    }
  )), []);

  const storeIndex = useCallback((data) => {
    if (!isEmpty(data)) {
      localStorage.setItem('index', JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    if (store?.status === 'initial') {
      if (isEmpty(indexData)) {
        index();
      }
    }
    if (store?.status === 'success') {
      storeIndex(store?.data?.data);
    }
  }, [store?.status]);

  const path = (route) => pathname.startsWith(route);
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

      <div className="w-full bg-theme-faint-1">
        {
          !path('/app') && <Header />
        }
        <Switch>

          {/* <Route path="/" component={HomePortal} /> */}
          <Route path="/" component={() => MainPortal({ pad })} />

          <Route render={() => <h1>Error 404. Page not found.</h1>} />
        </Switch>
        {
          !path('/app') && <Footer />
        }
        {/* ScrollUpBtn: src/components/ScrollUpBtn */}
        <ScrollUpBtn />
      </div>
      {/* </Router> */}
    </Suspense>

  );
}

export default App;
