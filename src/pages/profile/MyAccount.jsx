import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import { FcCurrencyExchange, RiLockPasswordLine, RiLogoutCircleLine } from 'react-icons/all';
import { myProfile } from '../../redux/actions/profileActions';
import FormBuilder from '../../components/form/builders/form';
import formBuilderProps from './constants/myInfo';
import User from '../../assets/images/User.svg';
import { logout } from '../../utilities/auth';
import ListMat from '../../components/ui/listMat';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import { notifier } from '../../utilities/stringOperations';
import PageTemp from '../../components/temps/PageTemp';

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
    if (store?.dp?.status === 'success') {
      setFormData({ ...formData, profile_pic_url: store?.dp?.data?.data?.uri });
      localforage.setItem('user', { ...formData, profile_pic_url: store?.dp?.data?.data?.uri });
    }
  }, [store?.dp]);
  useEffect(() => {
    if (store?.profile?.status === 'success') {
      setFormData({ ...store?.profile?.data?.data?.user });
    }
  }, [store?.profile?.status]);

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
  const profilePicTemp = (
    <div>
      <Avatar
        className="avatar"
        src={formData?.profile_pic_url
        || User}
      />
    </div>
  );
  const successTemp = (
    <div className="row">
      <div className="row">
        <h3 className="bold text-dark">
          My Profile
        </h3>
        <hr />
      </div>
      <div className="d-flex ">
        <div className="">

          <div className="">
            <ListMat props={linkProps} clss={{ main: 'bg-black', item: 'colorful-7 mt-1' }} />
          </div>

        </div>
        <div className="pb-5h px-5 bg-white inset-shadow border-radius-5 ">
          <CardContent>
            <div className="d-flex">
              <PageTemp
                view={profilePicTemp}
                initial={profilePicTemp}
                status={store?.dp?.status}
              />
              <div className="float-right">
                <div className="file-input ml-2" style={{ position: 'relative', top: '50%' }}>
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

    </div>
  );

  return (
    <div>

      <div className="w-100 bg-light margin-center m-t-40 ">
        <div className=" p-20">
          <PageTemp
            status={store?.profile?.status}
            view={successTemp}
          />
        </div>
      </div>
    </div>
  );
};
export default MyAccount;
