import React, { useEffect, useState } from 'react';
import isThisWeek from 'date-fns/isThisWeek';
import isThisMonth from 'date-fns/isThisMonth';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { RiNotification4Line } from 'react-icons/all';
import Badge from '@material-ui/core/Badge';
import { notifications } from '../../redux/actions/profileActions';
// import Loader from '../../components/microComponents/loader';
// import NoData from '../authentication/NoData';
import PageTemp from '../../components/temps/PageTemp';
import { notifier } from '../../utilities/stringOperations';

const user = { ...JSON.parse(localStorage.getItem('user')) };

const Notifications = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile.notifications);
  const [month, setMonth] = useState([]);
  const [week, setWeek] = useState([]);
  const [old, setOld] = useState([]);

  const mapToView = (items) => items.length > 0 && items.map((item) => (
    <Card className="my-5 hover-wema" key={Math.random()}>
      <CardContent>
        <div className="d-flex">
          <div>
            <RiNotification4Line className="text-wema font-1-5" />
          </div>
          <div className="pl-1">
            {item.message}
          </div>
        </div>
        <div>
          <small>
            {item.reason}
          </small>
        </div>
      </CardContent>
    </Card>
  ));

  useEffect(() => {
    if (store.status === 'initial') {
      if (setCurrent !== undefined) {
        setCurrent('My notifications');
      }
      dispatch(notifications());
    }
    if (store.status === 'success') {
      const weekData = store.data?.data?.filter((item) => isThisWeek(new Date(item.dateCreated)));
      const monthData = store.data?.data?.filter((item) => isThisMonth(new Date(item.dateCreated))
        && !isThisWeek(new Date(item.dateCreated)));
      const joinArr = weekData.concat(monthData);
      const oldData = store.data?.data?.filter((item) => joinArr.indexOf(item) === -1);
      setOld(oldData);
      setMonth(monthData);
      setWeek(weekData);
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
  }, [store.status]);

  const temp = (
    <div className="login-form-container p-20 mt-5">
      <div className="w-100">
        <div className="login-form pb-5h">
          <h3 className="bold text-dark mt-2">
            <Badge badgeContent={store?.data?.data?.length} color="secondary">
              <span className=" border-bottom">
                Notifications
              </span>
            </Badge>
          </h3>
          <div className="row">
            {
              week.length > 0
             && (
               <div className="py-3 col-md-4">
                 <h5 className="bold text-dark mb-2">
                   <Badge badgeContent={week.length} color="secondary">
                     this week
                   </Badge>

                 </h5>
                 {
                   mapToView(week)
                 }
               </div>
             )
            }
            {
              month.length > 0
             && (
               <div className="py-3 col-md-4">
                 <h5 className="bold text-dark mb-2">
                   <Badge badgeContent={month.length} color="secondary">
                     this month
                   </Badge>

                 </h5>
                 {
                   mapToView(month)
                 }
               </div>
             )
            }
            {
              old.length > 0
             && (
               <div className="py-3 col-md-4">
                 <h5 className="bold text-dark mb-2">
                   <Badge badgeContent={month.length} color="secondary">
                     Earlier
                   </Badge>

                 </h5>
                 {
                   mapToView(old)
                 }
               </div>
             )
            }
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={setCurrent === undefined ? ' pb-5h' : ''}>
      <div className="w-100 margin-center m-t-40 ">

        <PageTemp
          view={temp}
          status={store?.status}
        />

      </div>
    </div>

  );
};
export default Notifications;
