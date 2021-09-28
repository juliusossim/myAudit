import React from 'react';
import Loader from '../microComponents/loader';
import NoData from '../../pages/authentication/NoData';
import PageNotFound from '../../pages/authentication/PageNotFound';

const PageTemp = ({
  status, view, error, noData, initial, isPending, tryAgain, home
}) => (
  <div>
    {
      status === 'initial' && initial
    }
    {
      (status === 'pending' || isPending) && <div className="min-w-300-w"><Loader /></div>
    }
    {
      status === 'failed' && (
        <PageNotFound tryAgain={tryAgain} home={home} />
      )
    }
    {
      status === 'success' && noData && (
        <NoData tryAgain={tryAgain} home={home} />
      )
    }
    {
      status === 'success' && view
    }
  </div>
);
export default PageTemp;
