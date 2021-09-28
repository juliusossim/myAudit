import React from 'react';
import Loader from '../microComponents/loader';
import PageNotFound from '../../pages/authentication/PageNotFound';
import NoData from '../../pages/authentication/NoData';

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
