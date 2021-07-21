import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import { myProfile } from '../../redux/actions/profileActions';
import FormBuilder from '../../components/form/builders/form';
import formBuilderProps from './constants/myInfo';
// import {uploadFile} from "../../services/fetch";
import User from '../../assets/images/User.svg';

const MyAccount = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile.profile);
  /* state */
  const [formData, setFormData] = useState();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleProgress = (val) => setProgress(val);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const val = value;
    if (name === 'logo_id') {
      setFile(files);
      // uploadFile({ file: files[0], handleProgress, url: 'Uploads/logo' });
    }
    // if (name === 'profile_type' || name === 'manager') {
    //   val = Number(value);
    //   if (name === 'manager') {
    //     const manager = typeof user.details.signatories
    //     !== 'undefined' && formData.manager !== 'select manager'
    //       ? user.details.signatories[val]
    //       : null;
    //     setFormData({
    //       ...formData,
    //       account_name: manager?.account_name,
    //       phone_number: manager?.phone_number,
    //       customer_id: manager?.customer_id
    //     });
    //   }
    // }
    setFormData((state) => ({
      ...state,
      [name]: val
    }));
    if (name === 'account_number' && val.length === 10) {
      // verifyAccount();
    }
  };

  useEffect(() => {
    dispatch(myProfile());
  }, []);
  useEffect(() => {
    if (store.status === 'success') {
      setFormData({ ...store.data.data.user });
    }
  }, [store.status]);
  return (
    <div>

      <div className="w-600 margin-center m-t-40 ">
        <div className="login-form-container p-20">
          {
            store.status === 'pending'
                  && (
                    <div className="dial-loader text-wema left-5">
                      <p className="ping">Pulling profile info...</p>
                    </div>
                  )
          }
          {
            store.status === 'success'
                  && (
                    (
                      <div className="login-form pb-5h">
                        <h3 className="bold text-dark">
                          My Profile
                        </h3>
                        <p>
                          Click Edit Profile below to edit your profile
                        </p>
                        <div className="d-flex">
                          <div className="">
                            <Avatar
                              className="w-96 h-144"
                            >
                              <img src={formData?.profile_pic_url || User} alt="user Thumbnail" />
                            </Avatar>
                          </div>
                          <div className="col-md-4 center-center mt-5">
                            <button type="button" className="no-bg edit-picture-btn bg-gray font-14 line-height-21 text-pale">
                              Change Profile
                            </button>
                          </div>
                        </div>
                        <FormBuilder
                          formItems={
                            formBuilderProps(
                              {
                                formData,
                                // handleBlur,
                                handleChange,
                                errors
                                // btnMethod: verifyAccount,
                                // loading: store.verifyIndividual.status
                              }
                            )
                          }
                        />
                        <div className="float-right">
                          <button
                            className="w-100 btn  border-wema hover-wema mr-md-1 btn-small"
                            type="button"
                            // disabled={!store?.project?.data?.data?.id?.length > 0}
                            // onClick={handleSaveProgress}
                          >
                            Edit Profile
                          </button>
                        </div>
                      </div>
                    )
                  )
          }
          {
            store.status === 'failed'
            && (
              (
                <div className="w-600 margin-center m-t-40 ">
                  <div className="login-form-container p-20">
                    <div className="login-form pb-5h">
                      <h3 className="bold text-dark">
                        we could not load your data
                      </h3>
                    </div>
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
};
export default MyAccount;
