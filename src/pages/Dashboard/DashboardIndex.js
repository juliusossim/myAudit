import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../utilities/auth';
import PageTemp from '../../components/temps/PageTemp';
import OrdinaryTable from '../../components/table';
import Modal from '../../components/microComponents/modal';
import CustomizedTables from '../../components/tables/customMatTable';

const DashboardIndex = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  const [formData, setFormData] = useState({});
  const [transaction, setTransaction] = useState({});
  const [show, setShow] = useState(false);
  const [downloadable, setDownloadable] = useState(false);
  const [filterable, setFilterable] = useState(false);

  const prepareColumns = [
    {
      title: 'Name',
      field: 'projectName'
    },

    {
      title: 'Date Created',
      field: 'date',
      type: 'date'
    },
    {
      title: 'Company',
      field: 'projectName'
    },
    {
      title: 'No. of Member',
      field: 'projectName'
    },
    {
      title: 'Status',
      field: 'status'
    },
    {
      title: 'Actions',
      field: 'date',
      type: 'date'
    }
  ];
  const tableOption = {
    sorting: false,
    rowStyle: (x) => {
      if (x.tableData.id % 2) {
        return { backgroundColor: '#f2f2f2', borderBottom: 'none' };
      }
      return '';
    },
    search: false,
    filtering: filterable,
    exportButton: downloadable
  };

  const handleRowClick = (item) => {
    setShow(true);
    setTransaction(item);
  };

  return (
    <div className=" ">
      <div className="mx-5">
        <div className="">
          <div className="row p-5">
            <div className="col-md-3 mt-2 col-6">
              <div className=" bg-white p-2 border-radius-5">
                <p className="font-small theme-font text-theme-faint">Total Engagements</p>
                <p className="bold pt-3 pl-1 pb-2">{formData?.total_projects || 'NIL'}</p>
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
        </div>
        <CustomizedTables />
      </div>
      {/* <Modal */}
      {/*  className={show ? 'max-w-400 right mid center' : 'max-w-400 right top off'} */}
      {/*  content={transactionTemp} */}
      {/* /> */}

    </div>
  );
};

export default DashboardIndex;
