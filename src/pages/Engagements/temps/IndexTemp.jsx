import { Link } from 'react-router-dom';
import React from 'react';
import FancySearch from '../../../components/form/fancySearch';
import EngagementTable from '../../../components/tables/engagementTable';

const IndexTemp = ({ formData }) => (
  <div className="row ">
    <div className="col-md-10 offset-1">
      <div className="d-flex custom-top-bar justify-content-between">
        <div className=" p-3">
          Dashboard
        </div>
        <div className="mr-3">
          <FancySearch />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 mt-2 col-6">
          <div className=" bg-white p-2 border-radius-5">
            <p className="font-small theme-font text-theme-faint">Total Engagements</p>
            <p className="bold theme-font pt-3 pl-1 pb-2">{formData?.total_projects || 'NIL'}</p>
          </div>

        </div>
        <div className="col-md-3 mt-2 col-6">
          <div className=" bg-white p-2 border-radius-5">
            <p className="font-small theme-font text-theme-faint">Pending Conclusion</p>
            <p className="bold pt-3 pl-1 pb-2">{formData?.pending_conclusion || 'NIL'}</p>
          </div>

        </div>
        <div className="col-md-3 mt-2 col-6">
          <div className=" bg-white p-2 border-radius-5">
            <p className="font-small theme-font text-theme-faint">Concluded & Closed</p>
            <p className="bold pt-3 pl-1 pb-2">{formData?.concluded || 'NIL'}</p>
          </div>

        </div>
        <div className="col-md-3 mt-2 col-6">
          <div className=" bg-white p-2 border-radius-5">
            <p className="font-small theme-font text-theme-faint">Total Company</p>
            <p className="bold pt-3 pl-1 pb-2">{formData?.total_company || 'NIL'}</p>
          </div>

        </div>
      </div>
      <div className="">
        <div className="d-flex justify-content-between">
          <div className="text-theme-black font-regular bold">Recent Engagement</div>
          <div>
            <Link to="#" onClick={() => console.log('all')} className="font-regular text-theme-blue">See All</Link>
          </div>
        </div>
        <EngagementTable data={formData.engagements} />
      </div>
    </div>
    {/* <Modal */}
    {/*  className={show ? 'max-w-400 right mid center' : 'max-w-400 right top off'} */}
    {/*  content={transactionTemp} */}
    {/* /> */}

  </div>
);
export default IndexTemp;
