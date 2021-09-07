import React from 'react';
import Loader from '../microComponents/loader';

const PageTemp = ({
  status, view, error, noData
}) => (
  <div>
    {console.log(status)}
    {
      status === 'pending' && <Loader />
    }
    {
      status === 'success' && view
    }
    {
      status === 'failed' && (
        <div>
          <div className="card-body">
            We could not load the requested data at this time. You may try and refresh.
          </div>
        </div>
      )
    }
    {
      noData && (
        <div>
          <div className="card-body">
            There is no data to display yet.
          </div>
        </div>
      )
    }
  </div>
);
export default PageTemp;
