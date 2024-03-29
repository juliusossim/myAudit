import React, {
  useEffect, useState
} from 'react';
import addDays from 'date-fns/addDays';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import _ from 'lodash';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import { IoSadOutline } from 'react-icons/all';
import FormBuilder from '../../components/form/builders/form';
import { validateField } from '../../utilities/validation';
import { camelToString, notifier } from '../../utilities/stringOperations';
import formBuilderProjectsPreviewProps from './constants/startProject3Props';
import {
  editProject, submitProject, uploadMedia, getProject, projectAction, projectCategories
} from '../../redux/actions/projectActions';
import Loader from '../../components/microComponents/loader';
import { apiOptions } from '../../services/fetch';
import SimpleSnackbar from '../../components/microComponents/snackBar';
import Kat from '../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg';
import BackdropModal from '../../components/microComponents/backdropModal';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Project3 = () => {
  const { id } = useParams();
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  /* state */
  const [formData, setFormData] = useState({ id });
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [lgas, setLgas] = useState([]);
  const [states, setStates] = useState([]);
  const [minDate, setMinDate] = useState(new Date());
  const [minStartDate] = useState(addDays(Moment.now(), 3));
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const indexData = { ...JSON.parse(localStorage.getItem('index')) };

  const mapIndex = (arr) => arr.map((ar, index) => ({
    value: index + 1,
    name: ar
  }));

  const showUpload = (err) => notifier({
    type: 'error',
    title: 'error',
    text: 'media upload failed'
  });
  /**
  * get States and LGAs
  * */
  useEffect(() => {
    if (!_.isEmpty(indexData?.states)) {
      setStates(indexData?.states);
      setLgas(indexData?.states?.filter(
        (ste) => ste.stateId === (formData.stateId || 1)
      )[0].lgas);
    }
  }, [formData]);

  useEffect(() => {
    if (store.media.status === 'failed' && store?.getProject?.status !== 'pending') {
      showUpload(store.media?.message);
    }
    return true;
  }, [store.media?.status]);

  useEffect(() => {
    dispatch(getProject(formData.id));
    // dispatch(projectCategories());
  }, []);

  useEffect(() => {
    if (store.deleteMedia.status === 'success') {
      removeAtIndex(formData.deleteMedia);
    } else if (store.deleteMedia?.status === 'failed') {
      notifier({
        type: 'error',
        title: 'error',
        text: 'this media could not be deleted at this time, try again later'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.deleteMedia?.status]);

  useEffect(() => {
    if (store.media.status === 'failed' && store?.getProject?.status !== 'pending') {
      showUpload(store.media?.message);
    }
    if (store.media.status === 'success' && store?.getProject?.status !== 'pending') {
      const images = formData?.file;
      images?.pop();
      setFormData({
        ...formData,
        file: [...images, store?.media?.data?.data]
      });
    }
    return true;
  }, [store.media?.status]);

  useEffect(() => {
    if (formData.startDate) {
      setFormData({ ...formData, endDate: addDays(new Date(formData.startDate), 7) });
      setMinDate(addDays(new Date(formData.startDate), 7));
    }
  }, [formData.startDate]);

  useEffect(() => {
    if (store?.getProject?.status === 'success') {
      if (store.getProject?.data?.data !== undefined) {
        setFormData({
          file: [...store?.getProject?.data?.data?.media],
          ...store.getProject?.data?.data
        });
      }
    }
  }, [store?.getProject?.status]);

  useEffect(() => {
    if (store?.submitProject?.status === 'pending' || store?.project?.status === 'pending' || store?.editProjectRequest?.status === 'pending' || store?.getProject?.status === 'pending') {
      setLoading(true);
    }
    if (store?.project?.status === 'success' && formData.approvalStatus === 6) {
      handleOpen();
      setLoading(false);
      setMessage(`${formData.title} is not yet submitted. Do you wish to Submit Now?`);
    }
    if (store?.submitProject?.status === 'success' || store?.editProjectRequest?.status === 'success' || (store?.project?.status === 'success' && formData.approvalStatus !== 6)) {
      notifier({
        type: 'success',
        title: 'success',
        text: 'project submitted, an admin will attend to it accordingly.'
      });
      setTimeout(() => window.location.replace('/me'), 5000);
    } else if (store?.submitProject?.status === 'failed' || store?.project?.status === 'failed' || store?.editProjectRequest?.status === 'failed') {
      notifier({
        type: 'error',
        title: 'error',
        text: 'this action failed to execute, ensure your profile is verified'
      });
      setLoading(false);
    }
  },
  [store?.submitProject?.status, store?.editProjectRequest?.status, store?.project?.status]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const cancelUpload = () => {
    setFormData({ ...formData, file: '', logo_id: '' });
  };
  const handleDateChange = ({ date, name }) => {
    setFormData({ ...formData, [name]: date });
  };
  const handleSubmitProject = () => {
    const tem = {
      ...formData
    };
    handleClose();
    if (formData.donationTarget !== undefined && typeof formData.donationTarget === 'string') {
      const targetAmount = () => formData.donationTarget.replace(/[^\d.]/g, '');
      tem.donationTarget = Number(targetAmount());
    }
    if (tem.approvalStatus !== undefined) {
      switch (formData.approvalStatus) {
      case 2:
        return dispatch(submitProject(tem));
      // case 1:
      //   return dispatch(projectAction(
      //     {
      //       action: 'EDIT_PROJECT_REQUEST',
      //       routeOptions: apiOptions({
      //         method: 'patch',
      //         param: tem.id,
      //         body: tem,
      //         endpoint: 'EDIT_PROJECT_REQUEST',
      //         auth: true
      //       })
      //     }
      //   ));
      default:
        return dispatch(editProject(tem));
      }
    }
    return false;
  };
  const modalContent = (
    <div>
      <h3 className="text-wema">
        Project Update
      </h3>
      <p>
        <span>Do you wish to submit for approval now?  </span>
        <div className="d-md-flex row">
          <button type="button" className="btn m-3" onClick={() => { dispatch(submitProject(formData)); handleClose(); }}>Submit for approval</button>
          <Link to="/me" className="btn-plain border-1 m-3">My Projects</Link>
          <div className="float-right">
            <button type="button" className="btn-plain text-danger m-3" onClick={handleClose}>Close</button>
          </div>
        </div>
      </p>
    </div>
  );
  const replacedName = (name, apiValue) => {
    if (apiValue) {
      if (name === 'lga') {
        return ({ lgaId: apiValue });
      }
      if (name === 'state') {
        return ({ stateId: apiValue });
      }
    }
    return {};
  };

  const handleChange = (e) => {
    const {
      name, value, files, apiValue
    } = e?.target;
    if (name === 'media' && formData?.file?.indexOf(files[0] === -1)) {
      const fileSize = (files[0]?.size / 1024 / 1024).toFixed(3);
      if (fileSize > 1) {
        return notifier({
          type: 'error',
          title: 'error',
          text: `the media size of ${fileSize}MB is too large, size must not be larger than 1MB`
        });
      }
      setFormData({
        ...formData,
        file: [...formData.file, files[0]]
      });
      dispatch(
        uploadMedia(
          {
            payload: { file: files[0], id: formData.id }, setProgress
          }
        )
      );
      // uploadFile({ file: files[0], handleProgress, url: 'Uploads/logo' });
    } else {
      let val = value;
      if (name === 'projectType' || name === 'categoryId') {
        val = Number(val);
      }
      setFormData((state) => ({
        ...state,
        ...replacedName(name, apiValue),
        [name]: val
      }));
    }
    return true;
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
  const removeAtIndex = (item) => {
    const fileCopy = [...formData.file];
    const index = fileCopy.indexOf(item);
    fileCopy.splice(index, 1);
    setFormData({ ...formData, file: [...fileCopy] });
  };

  const deleteProjectMedia = (item) => {
    setFormData({ ...formData, deleteMedia: item });
    dispatch(projectAction(
      {
        action: 'DELETE_MEDIA',
        routeOptions: apiOptions({
          method: 'del',
          param: formData.id,
          afterParam: item.id,
          endpoint: 'DELETE_PROJECT_MEDIA',
          auth: true
        })
      }
    ));
  };

  return (
    <div className="content">
      <div className="w-100 margin-center m-t-40 ">
        <div className="login-form-container p-20 bg-light">
          {
            store?.getProject?.status === 'failed'
            && (
              <div className="card-body text-warning">
                <IoSadOutline />
                Failed to load project. Please try refreshing your browser or internet connection
              </div>
            )
          }
          <div className={`${store?.getProject?.status === 'failed' ? 'd-none' : 'login-form pb-5h'}`}>

            <div>
              <div className="text-wema">
                <h4>
                  <span className="pr-1">Review</span>
                  <span className="pr-1 bold">{formData.title}</span>
                </h4>
              </div>
              <hr />
            </div>

            <div className="row">
              <Card className="col-md-5 px-5 ">
                <div>
                  <div className="text-wema py-3">
                    <h4>
                      <span className="pr-1">Info</span>
                    </h4>
                  </div>
                </div>
                <FormBuilder
                  formItems={
                    formBuilderProjectsPreviewProps({
                      formData,
                      states,
                      lgas,
                      minDate,
                      minStartDate,
                      categories: store.projectCategories.data.data,
                      multiple: true,
                      removeItem: deleteProjectMedia,
                      skeleton: store?.project?.data?.data?.id,
                      excuseSkeleton: 'title',
                      setFormData: cancelUpload,
                      progress,
                      handleBlur,
                      handleChange,
                      handleDateChange,
                      btnMethod: () => setFormData({ ...formData, title: '' }),
                      loading: { status: store.project.status, text: 'initializing your project' },
                      loadingMedia: store.media?.status,
                      errors
                    }).info
                  }
                />
              </Card>
              <div className="col-md-7">
                <CardMedia
                  className="h-18h"
                  image={
                    _.head(formData?.file)?.uri
                    || Kat
                  }
                  title={formData.title}
                />
                <div className=" px-5 card-container border-wema pb-5">
                  <div>
                    <div className="text-wema py-3">
                      <h4>
                        <span className="pr-1">Location</span>
                      </h4>
                    </div>
                  </div>
                  <FormBuilder
                    formItems={
                      formBuilderProjectsPreviewProps({
                        formData,
                        states,
                        lgas,
                        minDate,
                        minStartDate,
                        categories: store.projectCategories.data.data,
                        multiple: true,
                        removeItem: deleteProjectMedia,
                        skeleton: store?.project?.data?.data?.id,
                        excuseSkeleton: 'title',
                        setFormData: cancelUpload,
                        progress,
                        handleBlur,
                        handleChange,
                        handleDateChange,
                        btnMethod: () => setFormData({ ...formData, title: '' }),
                        loading: { status: store.project.status, text: 'initializing your project' },
                        loadingMedia: store.media?.status,
                        errors
                      }).location
                    }
                  />
                  <div>
                    <div className="text-wema py-3">
                      <h4>
                        <span className="pr-1">About</span>
                      </h4>
                    </div>
                  </div>
                  <div className="">
                    <FormBuilder
                      formItems={
                        formBuilderProjectsPreviewProps({
                          formData,
                          states,
                          lgas,
                          minDate,
                          minStartDate,
                          categories: store.projectCategories.data.data,
                          multiple: true,
                          removeItem: deleteProjectMedia,
                          skeleton: store?.project?.data?.data?.id,
                          excuseSkeleton: 'title',
                          setFormData: cancelUpload,
                          progress,
                          handleBlur,
                          handleChange,
                          handleDateChange,
                          btnMethod: () => setFormData({ ...formData, title: '' }),
                          loading: { status: store.project.status, text: 'retrieving project name' },
                          loadingMedia: store.media?.status,
                          errors
                        }).description
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 ">
                <div>
                  <div className="text-wema py-3 text-center">
                    <h4>
                      <span className="pr-1">Calendar</span>
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <FormBuilder
                    formItems={
                      formBuilderProjectsPreviewProps({
                        formData,
                        states,
                        lgas,
                        minDate,
                        minStartDate,
                        categories: store.projectCategories.data.data,
                        multiple: true,
                        removeItem: deleteProjectMedia,
                        skeleton: store?.project?.data?.data?.id,
                        excuseSkeleton: 'title',
                        setFormData: cancelUpload,
                        progress,
                        handleBlur,
                        handleChange,
                        handleDateChange,
                        btnMethod: () => setFormData({ ...formData, title: '' }),
                        loading: { status: store.project.status, text: 'initializing your project' },
                        loadingMedia: store.media?.status,
                        errors
                      }).calendar
                    }
                  />
                </div>
              </div>

            </div>

            <div>

              <div className="float-right d-flex">
                <button
                  title="submit for review and approval"
                  className=" btn-plain text-wema border-wema hover-wema mr-md-1"
                  type="button"
                  disabled={loading}
                  onClick={handleSubmitProject}
                >
                  <span className="px-5">
                    {formData.approvalStatus === 1 ? ' Submit for approval' : 'Ok'}
                  </span>
                </button>
              </div>

              <div className="row">
                {
                  loading
                  && <Loader />
                }
              </div>
            </div>
            <BackdropModal handleClose={handleClose} open={open} content={modalContent} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Project3;
