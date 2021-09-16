import React, {
  useEffect, useState, lazy, useCallback
} from 'react';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import {
  IoArrowBackCircleOutline, IoArrowForwardCircleOutline
} from 'react-icons/all';
import {
  projectAction, uploadMedia
} from '../../../redux/actions/projectActions';
import LazyImage from '../../../components/microComponents/lazyImg';
import Kat from '../../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg';
import { apiOptions } from '../../../services/fetch';
import FormBuilder from '../../../components/form/builders/form';
import donationProps from './constants/donationProps';
import { camelToString, notifier, stringDoesNotExist } from '../../../utilities/stringOperations';
import { validateField } from '../../../utilities/validation';
import Poster1 from '../../../components/temps/projectTemps/poster1';
import ProjectProgress from '../../../components/temps/projectTemps/projectProgress';
import { currentUser } from '../../../utilities/auth';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Donate = () => {
  const { project } = useLocation();
  const { id } = useParams();
  const { goBack } = useHistory();
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);

  /* state */
  const [item, setItem] = useState({
    ...project, country: 1, shareMyInfo: true, anonymous: false
  });
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (project === undefined) {
      projectDetails(id);
    }
  }, []);
  useEffect(() => {
    if (!_.isEmpty(store.projectDetails?.data?.data)) {
      currentUser.then((result) => {
        if (!_.isEmpty(result)) {
          setItem({
            ...store.projectDetails?.data?.data, phone_number: result?.phone_number, email: result?.email, fullName: `${result?.first_name} ${result?.middle_name} ${result?.last_name}`
          });
        } else {
          setItem({
            ...item,
            ...store.projectDetails?.data?.data
          });
        }
      });
    }
  }, [store.projectDetails?.status]);

  const formatDonation = (amount) => {
    let formattedAmount = amount;
    if (amount !== undefined && typeof amount === 'string') {
      const targetAmount = () => amount.replace(/[^\d.]/g, '');
      formattedAmount = Number(targetAmount());
    }
    return formattedAmount;
  };
  const splitFullName = (fullName) => {
    if (stringDoesNotExist(fullName)) {
      return notifier({
        type: 'error',
        title: 'Empty Full Name',
        text: 'Please Enter Your Full Name'
      });
    }
    const arr = fullName.split(' ');
    let result = {
      firstName: _.head(arr),
      lastName: _.last(arr)
    };
    if (arr.length > 2) {
      result = { ...result, middleName: arr[1] };
    }
    return result;
  };
  const customerName = () => splitFullName(item?.fullName);
  // eslint-disable-next-line no-undef
  const popup = () => window.Alatpay !== undefined && Alatpay?.setup({
    // key: '0e51c3b4-43fa-4f61-246c-08d9714d2cfe',
    key: item?.businessId,
    email: item?.email,
    phone: item?.phone_number,
    firstName: customerName()?.firstName,
    lastName: customerName()?.lastName,
    currency: 'NGN',
    amount: formatDonation(item?.donation),

    onTransaction(response) {
      console.log(response);
      const donationPayload = {
        customerFirstName: response?.data?.customer?.firstName,
        customerLastName: response?.data?.customer?.lastName,
        customerEmail: response?.data?.customer?.email,
        customerPhone: response?.data?.customer?.phone,
        transactionId: response?.data?.id,
        amount: response?.data?.amount,
        anonymous: item?.anonymous,
        shareMyInfo: item?.shareMyInfo,
        transactionStatus: response?.data?.status,
        comment: item?.comment
      };
      makeDonation(id, donationPayload);
    },
    onClose() {
      console.log('Payment dialog is closed');
    }
  });

  const projectDetails = useCallback((theId) => {
    dispatch(projectAction(
      {
        action: 'PROJECT_DETAILS',
        routeOptions: apiOptions({
          method: 'get',
          param: theId,
          endpoint: 'PROJECT_DETAILS',
          auth: true,
          afterParam: 'details'
        })
      }
    ));
  }, []);
  const makeDonation = useCallback((theId, body) => {
    dispatch(projectAction(
      {
        action: 'PROJECT_DONATE',
        routeOptions: apiOptions({
          method: 'post',
          body,
          param: theId,
          endpoint: 'PROJECT_DONATE',
          afterParam: 'donate'
        })
      }
    ));
  }, []);
  const handleChange = (e) => {
    const {
      name, value
    } = e?.target;
    let val = value;
    if (name === 'projectType' || name === 'categoryId') {
      val = Number(val);
    }
    setItem((state) => ({
      ...state,
      [name]: val
    }));

    return true;
  };
  const handleChecked = (e) => {
    const { name } = e.target;
    setItem({
      ...item,
      [name]: !item[name]
    });
  };

  const handleBlur = (e, validations) => {
    const { name, value } = e.target;
    const field = camelToString(name);

    typeof field !== 'undefined'
    && setErrors(
      {
        ...errors,
        [name]: (
          validateField(validations, field, value)
        )
      }
    );
  };
  return (
    <div className="content">
      <div className="w-100 margin-center m-t-40">
        <div className="p-20 bg-light">
          <div>
            <p>
              <small>
                You are donating to
              </small>
            </p>
            <p className="h4 bold">
              {item?.title}
            </p>
          </div>
          <div className="row">
            <div className="col-md-7 ">
              <div className="bg-white">
                <div className="border p-4 mb-2">
                  <p>
                    <small className="bold">
                      Please Enter Your Donation
                    </small>
                  </p>
                  <div>
                    <FormBuilder
                      formItems={
                        donationProps({
                          formData: item,
                          handleBlur,
                          handleChange,
                          errors
                        }).amount
                      }
                    />
                  </div>
                </div>
                <div className="border p-4 mb-2">
                  <p>
                    <small className="bold">
                      Personal Details
                    </small>
                  </p>
                  <div className="row ">
                    <FormBuilder
                      formItems={
                        donationProps({
                          formData: item,
                          handleBlur,
                          handleChange,
                          errors
                        }).info
                      }
                    />
                  </div>
                  <div className="d-flex">
                    <div className="ml-2">
                      <input className="text-wema" type="checkbox" name="anonymous" checked={item.anonymous} onChange={handleChecked} />
                      {' '}
                      <span className="terms">
                        Donate as anonymous
                      </span>
                    </div>
                    <div className="pl-3">
                      <input className="text-wema" type="checkbox" name="shareMyInfo" checked={item.shareMyInfo} onChange={handleChecked} />
                      {' '}
                      <span className="terms">
                        Share My Email and Phone Number with Poster of this Project
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input className="text-wema border-wema" type="checkbox" name="terms" checked={item.terms} onChange={handleChecked} />
                {' '}
                <span className="terms">
                  <a href="" className="text-wema mr-1">
                    I accept
                  </a>
                  the terms and conditions
                  of Wemabank Crowdfunding
                </span>
              </div>
              <div className="d-flex mt-3">
                <button type="button" className="btn btn-sm w-25" onClick={() => popup().show()} disabled={!item?.terms} title={item?.terms ? '' : 'Please Accept terms and conditions first!'}>
                  Donate
                </button>
                <button type="button" className="btn-plain btn-sm border-wema ml-2 w-25" onClick={() => goBack()}>
                  Back
                </button>
              </div>
            </div>
            <div className="col-md-5">
              <div>
                <CardMedia
                  className="h-30h"
                  image={_.head(item?.media)?.uri || Kat}
                  title={project?.title}
                />
              </div>
              <div className="mt-3 border p-3">
                <ProjectProgress project={item} />
              </div>
              <div className="mt-3 border p-3">
                <Poster1 project={item} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;