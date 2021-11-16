import React from 'react';
import {
  useHistory
} from 'react-router-dom';
import { noDataSvg } from '../../utilities/dummyData';

const NoData = ({
  link, name, text, title, btnName
}) => {
  const { push } = useHistory();
  return (
    <div className="w-100">
      <div className="d-flex ml-4 custom-top-bar justify-content-between">
        <div className="text-theme-black bold">
          {name?.toUpperCase()}
        </div>
      </div>
      <div className="max-w-350 margin-center">
        <div className="text-center center-vertical-2">
          {noDataSvg}
          <div className="text-theme-black font-title-small bold">
            {title || ''}
          </div>
          <div className="text-theme-faint text-center">
            {text || ''}
          </div>
          <button className="btn" type="button" onClick={() => push(link)}>
            {btnName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoData;
