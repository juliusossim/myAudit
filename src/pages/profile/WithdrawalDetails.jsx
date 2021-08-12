import React, { lazy, useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { myProfile } from '../../redux/actions/profileActions';
import FormBuilder from '../../components/form/builders/form';
import formBuilderProps from './constants/withdrawalDetails';
import TextInput from '../../components/form/inputs/TextInput';
import BackdropModal from '../../components/microComponents/backdropModal';
import { sendAccountOtp, verifyAccountOtp } from '../../redux/actions/authenticationActions';

const SelectManager = lazy(() => import('./editUser/manager/SelectManager'));
const user = { ...JSON.parse(localStorage.getItem('user')) };

const WithdrawalDetails = ({ setCurrent }) => {
  const dispatch = useDispatch();
  const [formData] = useState({ ...user, account_name: `${user.first_name || ''} ${user.last_name || ''}` });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setCurrent('My withdrawal details');
  }, []);

  const handleShow = () => setShow(!show);
  const verifyOtp = () => {
    // setShow(true);
    dispatch(verifyAccountOtp({
      user_id: user.details?.id,
      token: formData.otp,
      customer_id: formData.customer_id
      // phone_number: formData.phone_number
    }));
  };
  return (
    <div className="w-600 margin-center m-t-40 ">
      <div className="login-form-container p-20">
        <div className="login-form pb-5h">
          <FormBuilder
            formItems={
              formBuilderProps(
                {
                  formData
                }
              )
            }
          />
          <div className="float-right">
            <button
              className="w-100 btn  border-wema hover-wema mr-md-1 btn-small"
              type="button"
              onClick={handleShow}
            >
              Change Details
            </button>
          </div>

        </div>
        <BackdropModal
          open={show}
          handleClose={handleShow}
          // className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
          content={<SelectManager handleClose={handleShow} id={user.id} />}
        />
      </div>
    </div>

  );
};
export default WithdrawalDetails;
