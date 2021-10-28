import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { company } from '../../utilities/auth';
import PageTemp from '../../components/temps/PageTemp';
import OrdinaryTable from '../../components/table';
import Modal from '../../components/microComponents/modal';
import DashboardTable from '../../components/tables/dashboardTable';
import FancySearch from '../../components/form/fancySearch';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';

const DashboardIndex = () => {
  const dispatch = useDispatch();
  const { id, name } = useParams();
  const store = useSelector((state) => state.engagement?.engagement);
  const [formData, setFormData] = useState({});
  const [transaction, setTransaction] = useState({});
  const [show, setShow] = useState(false);
  const [downloadable, setDownloadable] = useState(false);
  const [filterable, setFilterable] = useState(false);

  useEffect(() => {
    if (store.status === 'initial') {
      index();
    }
    if (store.status === 'success') {
      !_.isEmpty(store?.data?.data) && setFormData(store.data.data);
    }
  }, [store?.status]);

  const index = useCallback(() => {
    dispatch(projectAction(
      {
        action: 'ENGAGEMENT',
        routeOptions: apiOptions({
          method: 'get',
          endpoint: 'ENGAGEMENT',
          param: id,
          auth: true
        })
      }
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = (item) => {
    setShow(true);
    setTransaction(item);
  };

  return (
    <PageTemp
      store={store}
      view={(
        <div className="row ">
          <div className="col-md-10 offset-1">
            <div className="d-flex ml-4 custom-top-bar justify-content-between">
              <div className="text-theme-black bold">
                {`${formData?.company_name} ${formData?.name}`}
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
                <div className="text-theme-black font-regular bold">Engagement Team</div>
                <div>
                  <Link to="#" onClick={() => console.log('all')} className="font-regular text-theme-blue">See All</Link>
                </div>
              </div>
              <DashboardTable />
            </div>
          </div>
          {/* <Modal */}
          {/*  className={show ? 'max-w-400 right mid center' : 'max-w-400 right top off'} */}
          {/*  content={transactionTemp} */}
          {/* /> */}

        </div>
      )}
      action="ENGAGEMENT_COMPLETE"
      retry={index}
    />
  );
};

export default DashboardIndex;
