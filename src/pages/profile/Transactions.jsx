import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { formatDistanceToNow } from 'date-fns';
import {
  IoHappyOutline,
  GiThumbUp, FcDownload, FiFilter
} from 'react-icons/all';
import { myProfile } from '../../redux/actions/profileActions';
import {
  notifier, stringCaps
} from '../../utilities/stringOperations';
import OrdinaryTable from '../../components/table';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import PageTemp from '../../components/temps/PageTemp';
import Modal from '../../components/microComponents/modal';
import { positiveDiffs } from '../../utilities/dateOperations';
import SpeedMatDial from '../../components/microComponents/speedDial';

const userscol = ['name', 'role', 'department', 'joined'];

const Transactions = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project?.userTransactions);
  const [formData, setFormData] = useState({});
  const [transaction, setTransaction] = useState({});
  const [show, setShow] = useState(false);
  const [downloadable, setDownloadable] = useState(false);
  const [filterable, setFilterable] = useState(false);
  const [user, setUser] = useState({});

  const userTransactions = () => dispatch(projectAction(
    {
      action: 'USER_TRANSACTIONS',
      routeOptions: apiOptions({
        method: 'get',
        auth: true,
        endpoint: 'USER_TRANSACTIONS'
      })
    }
  ));
  // const refreshUser = setUser(store.data);
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
  const handleRowClick = (item) => {
    setShow(true);
    setTransaction(item);
  };
  const transactionTemp = (
    <div className="p-4">
      <div className="row">
        <div>
          <p className="bold text-wema font-1-5">{transaction?.projectName}</p>
        </div>
        <div className="float-right top-right-coner text-wema small">
          {
            positiveDiffs(new Date(transaction?.date))
          }
        </div>
      </div>
      <hr className="border-wema" />
      <div className="">
        <p className="bold text-wema font-1-5">Donor</p>
        <div className="">
          <div>
            <p>
              <span className="text-wema mr-2">Name:</span>
              <span>
                {`${transaction?.customerFirstName} ${transaction?.customerLastName}`}
              </span>
            </p>
            <p>
              <span className="text-wema mr-2">Contact:</span>
              <span>
                {`${transaction?.customerPhone}, ${transaction?.customerEmail}`}
              </span>
            </p>
            <p>
              <span className="text-wema mr-2">Amount:</span>
              <span>&#8358;</span>
              <span>
                {parseFloat(transaction?.amount).toLocaleString()}
              </span>

            </p>

          </div>
        </div>
        <hr className="border-wema" />
        <div>
          <p className="bold text-wema font-1-5">Comments</p>
          <p>{transaction?.comment}</p>
        </div>
        <hr className="border-wema" />
        <div>
          <button
            type="button"
            className="btn-plain text-wema border-wema float-right mb-2"
            onClick={() => setShow(false)}
          >
            <GiThumbUp />
            Cool
          </button>
        </div>
      </div>
    </div>
  );
  const speedActions = [
    { icon: <FiFilter />, name: 'filterable' },
    { icon: <FcDownload />, name: 'exportable' }
  ];

  React.useEffect(() => {
    if (store?.status === 'initial') {
      userTransactions();
    }
    if (store?.status === 'success') {
      setFormData(store?.data?.data);
    }
    if (store?.status === 'failed') {
      notifier({
        title: 'error',
        type: 'error',
        text: store?.data
          || store?.data?.message
          || 'could not load your projects'
      });
    }
    return true;
  }, [store?.status]);
  return (
    <div className="w-100 ">
      <PageTemp
        status={store?.status}
        view={(
          <div className="mx-5">
            <div className="">
              <div className="row pb-5">
                <div className="col-md-3 mt-2 col-6">
                  <div className=" bg-white p-2 border-radius-5">
                    <p className="transaction-text font-14">Total Number of Projects</p>
                    <p className="bold pt-3 pl-1 pb-2">{formData?.summary?.totalProjects?.total}</p>
                  </div>

                </div>
                <div className="col-md-3 mt-2 col-6">
                  <div className=" bg-white p-2 border-radius-5">
                    <p className="transaction-text font-14">Total Number of Donors</p>
                    <p className="bold pt-3 pl-1 pb-2">{formData?.summary?.donors?.total ?? 'Nil'}</p>
                  </div>

                </div>
                <div className="col-md-3 mt-2 col-6">
                  <div className=" bg-white p-2 border-radius-5">
                    <p className="transaction-text font-14">Total Number of Shares</p>
                    <p className="bold theme-font pt-3 pl-1 pb-2">{formData?.summary?.shares ?? 'NIl'}</p>
                  </div>

                </div>
                <div className="col-md-3 mt-2 col-6">
                  <div className=" bg-white p-2 border-radius-5">
                    <p className="transaction-text font-14">Total Amount of funds raised </p>
                    <p className="bold pt-3 pl-1 pb-2">
                      {' '}
                      <span>&#8358;</span>
                      <span>{formData?.summary?.amountRaised?.total?.toLocaleString() ?? 0}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 custom-table">
                  <OrdinaryTable
                    columnsDef={prepareColumns}
                    title="Recent Engagements"
                    data={formData.donations}
                    handleRowClick={handleRowClick}
                    tableOptions={tableOption}
                  />
                </div>
                {/* <div className="row"> */}
                {/*  <SpeedMatDial */}
                {/*    actions={speedActions} */}
                {/*    props={{ */}
                {/*      filterable: () => setFilterable(!filterable), */}
                {/*      exportable: () => setDownloadable(!downloadable) */}
                {/*    }} */}
                {/*  /> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        )}
      />

      <Modal
        className={show ? 'max-w-400 right mid center' : 'max-w-400 right top off'}
        content={transactionTemp}
      />

    </div>
  );
};
export default Transactions;
