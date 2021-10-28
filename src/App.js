import React, {
  Suspense, useCallback, useEffect
} from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();

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
        {/* <Footer /> */}
        {/* ScrollUpBtn: src/components/ScrollUpBtn */}
        <ScrollUpBtn />
      </div>
      {/* </Router> */}
    </Suspense>

  );
}

export default App;
