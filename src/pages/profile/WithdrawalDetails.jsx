import React, { lazy, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormBuilder from '../../components/form/builders/form';
import formBuilderProps from './constants/withdrawalDetails';
import BackdropModal from '../../components/microComponents/backdropModal';
import { verifyAccountOtp } from '../../redux/actions/authenticationActions';

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
    <div className="w-100 margin-center m-t-40 ">
      <div className="login-form-container p-20">
        <div className="login-form pb-5h">
          <div className="pb-5 max-w-400 border-wema p-4 border-radius-5">
            <FormBuilder
              formItems={
                formBuilderProps(
                  {
                    formData
                  }
                )
              }
            />
            {
              user?.role === 'Manager'
              && (
                <div className="float-right">
                  <button
                    className="w-100 btn  border-wema hover-wema mr-md-1 btn-small"
                    type="button"
                    onClick={handleShow}
                  >
                    Change Details
                  </button>
                </div>
              )
            }
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
