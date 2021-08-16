import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { FcCurrencyExchange, RiLockPasswordLine, RiLogoutCircleLine } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { myProfile } from '../../redux/actions/profileActions';
import FormBuilder from '../../components/form/builders/form';
import formBuilderProps from './constants/myInfo';
// import {uploadFile} from "../../services/fetch";
import User from '../../assets/images/User.svg';
import Kat from '../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg';
import Loader from '../../components/microComponents/loader';
import { logout } from '../../utilities/auth';
import ListMat from '../../components/ui/listMat';
import { formBuilderProjectsStartProps } from '../project/constants/startProject1Props';
import { projectAction, uploadMedia } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import { camelToString, notifier } from '../../utilities/stringOperations';
import { validateField } from '../../utilities/validation';
import profileProps from './constants/profilePic';

const MyAccount = ({ setCurrent }) => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);
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
    if (name === 'profile_pic_url') {
      const fileSize = (files[0]?.size / 1024 / 1024).toFixed(3);
      if (fileSize > 1) {
        return notifier({
          type: 'error',
          title: 'error',
          text: `the media size of ${fileSize}MB is too large, size must not be larger than 1MB`
        });
      }
      // setFormData({
      //   ...formData,
      //   file: [...formData.file, files[0]]
      // });
      uploadDP(files[0]);
      // uploadFile({ file: files[0], handleProgress, url: 'Uploads/logo' });
    } else {
      setFormData((state) => ({
        ...state,
        [name]: val
      }));
      if (name === 'account_number' && val.length === 10) {
        // verifyAccount();
      }
    }
    return true;
  };

  useEffect(() => {
    setCurrent('My profile');
    dispatch(myProfile());
  }, []);
  useEffect(() => {
    if (store?.profile?.status === 'success') {
      setFormData({ ...store?.profile?.data?.data?.user });
    }
  }, [store?.profile?.status]);
  // useEffect(() => {
  //   if (store?.dp?.status === 'success') {
  //     setFormData({ ...formData, dp: store?.dp?.data?.data?. });
  //   }
  // }, [store?.profile?.status]);

  const linkProps = [
    {
      name: 'Change Password',
      icon: <RiLockPasswordLine />,
      link: '/change-password'
    },
    {
      name: 'Change Withdrawal Account',
      icon: <FcCurrencyExchange />,
      onClick: () => setShow(true)
    },
    {
      name: 'sign out',
      icon: <RiLogoutCircleLine />,
      onClick: () => logout('/', false)
    }
  ];
  const deleteDP = (item) => {
    setFormData({ ...formData, deleteMedia: item });
    dispatch(projectAction(
      {
        action: 'DELETE_MEDIA',
        routeOptions: apiOptions({
          method: 'del',
          param: formData.id,
          pQuery: { mediaId: item.uri },
          endpoint: 'DELETE_PROJECT_MEDIA',
          auth: true
        })
      }
    ));
  };
  const uploadDP = (item) => {
    const data = new FormData();
    data.append('profile_pic_url', item);
    dispatch(projectAction(
      {
        action: 'DP',
        routeOptions: apiOptions({
          method: 'post',
          body: data,
          multipart: true,
          setProgress,
          endpoint: 'DP',
          auth: true
        })
      }
    ));
  };
  const cancelUpload = () => {
    setFormData({ ...formData, file: '', logo_id: '' });
  };

  return (
    <div>

      <div className="w-100 bg-light margin-center m-t-40 ">
        <div className=" p-20">
          {
            store?.profile?.status === 'pending'
                  && (
                    <Loader />
                  )
          }
          {
            store?.profile?.status === 'success'
                  && (
                    (
                      <div className="row">
                        <div className="row">
                          <h3 className="bold text-dark">
                            My Profile
                          </h3>
                          <p>
                            Click Edit Profile below to edit your profile
                          </p>
                          <hr />
                        </div>
                        <div className="col-md-5 pb-5h ">
                          <CardContent>
                            <div className="wema-house-parallax">
                              <ListMat props={linkProps} clss={{ main: 'bg-black', item: 'colorful-7 mt-1' }} />
                            </div>
                          </CardContent>
                        </div>
                        <div className="col-md-7 pb-5h px-5 bg-white inset-shadow ">
                          <CardContent>
                            <div className="d-flex">
                              <div className="">
                                <Avatar src={formData?.profile_pic_url
                                  || User}
                                />
                              </div>
                              <div className="float-right">
                                <div className="file-input ml-2">
                                  <button type="button">
                                    change picture
                                  </button>
                                  <input
                                    type="file"
                                    className="btn pb-3 px-2 bg-wema py-1 w-50"
                                    name="profile_pic_url"
                                    onChange={handleChange}
                                  />
                                </div>
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
                                Save
                              </button>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    )
                  )
          }
          {
            store.status === 'failed'
            && (
              (
                <div className="login-form pb-5h">
                  <h3 className="bold text-dark">
                    we could not load your data
                  </h3>
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
