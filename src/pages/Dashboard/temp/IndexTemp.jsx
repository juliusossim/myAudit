import { Link } from 'react-router-dom';
import _ from 'lodash';
import React from 'react';
import FancySearch from '../../../components/form/fancySearch';
import { InfoBarTemp } from '../../../components/temps/projectTemps/miscTemps';
import { sentenceCaps } from '../../../utilities/stringOperations';

const IndexTemp = ({
  infoBarData, parent, header, link, table
}) => (
  <div className="row ">
    <div className="col-md-10 offset-1">
      <div className="d-flex custom-top-bar justify-content-between">
        <div className="theme-font-2 text-theme-black bold p-3">
          {parent?.toUpperCase()}
        </div>
        <div className="mr-3">
          <FancySearch />
        </div>
      </div>
      <InfoBarTemp data={infoBarData} />
      <div className="">
        <div className="d-flex justify-content-between">
          <div className="text-theme-black font-regular bold">{sentenceCaps(header)}</div>
          <div>
            <Link
              to={link?.to}
              className={_.isEmpty(link) ? 'd-none' : 'font-regular text-theme-blue'}
            >
              {sentenceCaps(link?.name)}
            </Link>
          </div>
        </div>
        {table}
      </div>
    </div>
    {/* <Modal */}
    {/*  className={show ? 'max-w-400 right mid center' : 'max-w-400 right top off'} */}
    {/*  content={transactionTemp} */}
    {/* /> */}

  </div>
);
export default IndexTemp;
