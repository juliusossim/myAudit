import React from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { myProfile } from '../../redux/actions/profileActions';

const Notifications = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);
  const [user, setUser] = React.useState({});
  // const getUser = React.useCallback(() => {
  //   localforage.getItem('user', (err, value) => value).then((result) => setUser(result));
  //   dispatch(myProfile());
  // }, [user]);
  // // const refreshUser = setUser(store.data);
  // React.useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <div className="w-100 margin-center m-t-40 ">
      <div className="login-form-container p-20">
        <div className="login-form pb-5h">
          this is profile page
        </div>
      </div>
    </div>
  );
};
export default Notifications;
