import React, { useEffect } from 'react';
import {
  Link, useHistory, useLocation, useParams
} from 'react-router-dom';
import { FcDeleteDatabase } from 'react-icons/all';

const NoData = ({ redirect }) => {
  const { push } = useHistory();
  useEffect(() => push(redirect), []);
  return (
    <div className="w-100 m-t-40">
      <div className="max-w-600 w-600 margin-center">
        <div style={{ fontSize: '5rem', lineHeight: '0' }}>
          <FcDeleteDatabase />
        </div>
        <div className="text-center">
          <div className="text-muted mb-5">
            <p className="h1">
              Nothing To See Here
            </p>
            <div className="mt-2">
              There is yet not enough information to display.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoData;
