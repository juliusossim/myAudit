import React from 'react';
import Loader from '../microComponents/loader';
import CompleteProfile from '../../pages/authentication/CompleteProfile';
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
        <CompleteProfile tryAgain={tryAgain} home={home} />
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
