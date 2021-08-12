import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { formatDistanceToNow } from 'date-fns';
import { myProfile } from '../../redux/actions/profileActions';
import { stringCaps } from '../../utilities/stringOperations';
import OrdinaryTable from '../../components/table';

const userscol = ['name', 'role', 'department', 'joined'];

const Transactions = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);
  const [user, setUser] = useState({});

  useEffect(() => {
    setCurrent('My transactions');
  }, []);

  const getUser = React.useCallback(() => {
    localforage.getItem('user', (err, value) => value).then((result) => setUser(result));
    dispatch(myProfile());
  }, [user]);
  // const refreshUser = setUser(store.data);
  const createColumnDef = (arr) => arr.map((ar) => ({ title: stringCaps(ar), field: ar }));
  const transactionsData = [
    {
      title: 'Operation feed the nation',
      account_number: '0020686346',
      amount: 240000000
    }
  ];
  const prepareColumns = [
    {
      title: 'Project Name',
      field: 'title'
    },

    {
      title: 'Account Credited',
      field: 'account_number'
    },
    {
      title: 'Amount',
      field: 'amount'
    }
  ];
  // React.useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <div className="w-100 margin-center m-t-40 ">
      <div className="login-form-container p-20">
        <div className="login-form pb-5h">
          <div className="row pb-5">
            <div className="col-md-3">
              <div className=" border-wema p-2 border-radius-5">
                <p className="">Total Number of Projects</p>
                <p className="bold pt-3 pl-1 pb-2">9</p>
              </div>

            </div>
            <div className="col-md-3">
              <div className=" border-wema p-2 border-radius-5">
                <p className="">Total Number of Donors</p>
                <p className="bold pt-3 pl-1 pb-2">34</p>
              </div>

            </div>
            <div className="col-md-3">
              <div className=" border-wema p-2 border-radius-5">
                <p className="">Total Number of Shares</p>
                <p className="bold pt-3 pl-1 pb-2">234</p>
              </div>

            </div>
            <div className="col-md-3">
              <div className=" border-wema p-2 border-radius-5">
                <p className="">Total Amount of funds raised </p>
                <p className="bold pt-3 pl-1 pb-2">#3995868558</p>
              </div>
            </div>
          </div>

          <OrdinaryTable
            columnsDef={prepareColumns}
            title="Transactions"
            data={transactionsData}
          />
        </div>
      </div>
    </div>
  );
};
export default Transactions;
