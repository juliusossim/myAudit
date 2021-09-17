import React from 'react';
import Loader from '../microComponents/loader';

const PageTemp = ({
  status, view, error, noData, initial
}) => (
  <div>
    {
      status === 'initial' && initial
    }
    {
      status === 'pending' && <div className="min-w-300-w"><Loader /></div>
    }
    {
      status === 'failed' && (
        <div>
          <div className="card-body">
            {
              error
              || 'We could not load the requested data at this time. You may try and refresh'
            }
          </div>
        </div>
      )
    }
    {
      status === 'success' && noData && (
        <div>
          <div className="card-body">
            There is no data to display yet.
          </div>
        </div>
      )
    }
    {
      status === 'success' && view
    }
  </div>
);
export default PageTemp;
