import React, {
  Suspense, useCallback, useEffect
} from 'react';
import { Switch, Route } from 'react-router-dom';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import MainPortal from './routes/MainPortal';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Loader from './components/microComponents/loader';
import { projectAction } from './redux/actions/projectActions';
import { apiOptions } from './services/fetch';
import ScrollUpBtn from './layouts/ScrollUpBtn';

function App() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  const indexData = { ...JSON.parse(localStorage.getItem('index')) };
  const [pad, setPad] = React.useState(null);

  // const cacheAvailable = 'caches' in window.self;
  // const cacheName = 'index';
  // const url = `${process.env.REACT_APP_BACKEND_URL}
  // /${process.env.REACT_APP_PROJECT_SERVER}/index`;
  // if (cacheAvailable) {
  //   caches.open(cacheName).then((cache) => {
  //     cache.add(url).then(() => {
  //       console.log('Data cached ');
  //     });
  //   });
  // }
  // console.log();
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
    if (!_.isEmpty(data)) {
      localStorage.setItem('index', JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    if (store.index?.status === 'initial' && _.isEmpty(indexData)) {
      index();
    }
    if (store?.index?.status === 'success' && !_.isEmpty(store?.index?.data?.data?.categories)) {
      storeIndex(store?.index?.data?.data);
    }
  }, [store?.index?.status]);
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
        {/* <Header setWidth={setPad} /> */}
        <Switch>

          {/* <Route path="/" component={HomePortal} /> */}
          <Route path="/" component={() => MainPortal({ pad })} />

          <Route render={() => <h1>Error 404. Page not found.</h1>} />
        </Switch>
        <Footer />
        {/* ScrollUpBtn: src/components/ScrollUpBtn */}
        <ScrollUpBtn />
      </div>
      {/* </Router> */}
    </Suspense>

  );
}

export default App;
