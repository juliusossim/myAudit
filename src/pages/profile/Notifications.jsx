import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { RiNotification4Line } from 'react-icons/all';
import { notifications } from '../../redux/actions/profileActions';

const user = { ...JSON.parse(localStorage.getItem('user')) };

const Notifications = () => {
  const dispatch = useDispatch();
  const [formData] = useState({ ...user, account_name: `${user.first_name || ''} ${user.last_name || ''}` });
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  useEffect(() => {
    dispatch(notifications());
  }, []);
  return (
    <div className="w-600 margin-center m-t-40 ">
      <div className="login-form-container p-20">
        <h3 className="bold text-dark">
          Notifications
        </h3>
        <div className="py-3">
          <h5 className="bold text-dark">
            this week
          </h5>
          <Card>
            <CardContent>
              <div className="d-flex">
                <div>
                  <RiNotification4Line className="text-wema font-1-5" />
                </div>
                <div className="pl-1">
                  your profile has been approved and now live
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="py-3">
          <h5 className="bold text-dark">
            this month
          </h5>
          <Card>
            <CardContent>
              <div className="d-flex">
                <div>
                  <RiNotification4Line className="text-wema font-1-5" />
                </div>
                <div className="pl-1">
                  your profile has been approved and now live
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

  );
};
export default Notifications;
