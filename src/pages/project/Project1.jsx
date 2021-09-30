import React, {
  useEffect, useCallback, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link, Redirect, useHistory, useLocation, useParams
} from 'react-router-dom';
import addDays from 'date-fns/addDays';
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import FormBuilder from '../../components/form/builders/form';
import { validateField } from '../../utilities/validation';
import { camelToString, notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { formBuilderProjectsStartProps, title } from './constants/startProject1Props';
import {
  projectCategories, editProject1, uploadMedia, projectAction
} from '../../redux/actions/projectActions';
import { findItem } from '../../utilities/arrayOperations';
import ModalTemplate from '../../components/temps/modalTemps/temp';
import Loader from '../../components/microComponents/loader';
import { apiOptions } from '../../services/fetch';
import PageTemp from '../../components/temps/PageTemp';
import CollapsedBreadcrumbs from '../../layouts/Breadcrumb';
import { user } from '../../utilities/auth';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */

const Project1 = () => {
  const { id, projectTitle } = useParams();
  const location = useLocation();
  const history = useHistory();
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  /* state */
  const [formData, setFormData] = useState({
    title: projectTitle,
    file: [],
    projectType: 10,
    categoryId: 10,
    state: 'Lagos',
    stateId: 24,
    startDate: addDays(Moment.now(), 3),
    endDate: addDays(Moment.now(), 10),
    description: `
  Hi my name is ${user?.first_name || ''} ${user?.middle_name || ''} ${user?.last_name || ''},
  I am appealing to the general public to join in raising funds to support our ${projectTitle}...
  `,
    summary: `${projectTitle} is a project requesting public funding to...`,
    ...location.state?.data
  });
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const indexData = { ...JSON.parse(localStorage.getItem('index')) };
  const showUpload = (err) => notifier({
    type: 'error',
    title: 'error',
    text: 'media upload failed'
  });

  useEffect(() => {
    if (store.media.status === 'failed' && store?.project1?.status !== 'pending') {
      showUpload(store.media?.message);
    }
    if (store.media.status === 'success' && store?.project1?.status !== 'pending') {
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
    if (store.deleteMedia.status === 'success') {
      return removeAtIndex(formData.deleteMedia);
    }
    if (store.deleteMedia.status === 'failed') {
      return notifier({
        title: 'error',
        type: 'error',
        text: store.deleteMedia?.data || store.deleteMedia?.data?.message || 'failed to delete project'
      });
    }
    return 'clear';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.deleteMedia?.status]);

  useEffect(() => {
    if (store.project1?.status === 'success' && history.state.prevPath !== `/project/create/form-2/${id}`) {
      setTimeout(() => handleClose(), 5000);
      notifier({
        type: 'success',
        title: 'Progress Saved',
        text: `Your project ${formData.title} has been updated`
      });
    }
  }, [store.project1?.status]);

  const getProject = useCallback(() => {
    dispatch(projectAction(
      {
        action: 'GET_PROJECT',
        routeOptions: apiOptions({
          method: 'get',
          endpoint: 'GET_PROJECT',
          param: id
        })
      }
    ));
  }, [id]);
  const handleClose = () => {
    setShow(false);
    setLoading(false);
    // if (history?.state?.prevPath === `/project/create/form-2/${id}`) {
    //   window.location.replace('/');
    // }
  };
  const cancelUpload = () => {
    setFormData({ ...formData, file: '', logo_id: '' });
  };
  const handleDateChange = ({ date, name }) => {
    setFormData({ ...formData, [name]: date });
  };

  const populateFormData = () => {
    const tem = {
      ...formData
    };
    if (formData.donationTarget !== undefined && typeof formData.donationTarget === 'string') {
      const targetAmount = () => formData.donationTarget.replace(/[^\d.]/g, '');
      tem.donationTarget = Number(targetAmount());
    }
    setFormData(tem);
    return tem;
  };

  const handleSave = () => {
    setShow(false);
    setLoading(true);
    const tem = populateFormData();
    dispatch(editProject1(tem));
  };
  const handleChange = (e) => {
    const {
      name, value, files
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
            payload: { file: files[0], id }, setProgress
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
    const fileCopy = [...formData?.file];
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

  const handleContinue = () => {
    setLoading(false);
    const tem = populateFormData();
    dispatch(editProject1(tem));
    history.push({
      pathname: `/project/create/form-2/${id}`,
      state: { data: tem }
    });
  };

  const text = () => `Your project ${formData.title} has been updated`;
  const initialTemp = (
    <div>
      <div className="my-3">
        <small>you can edit the name</small>
        <div>
          <FormBuilder
            formItems={
              title(
                {
                  formData,
                  removeItem: removeAtIndex,
                  handleBlur,
                  handleChange,
                  btnMethod: () => setFormData({ ...formData, title: '' }),
                  loading: { status: store?.status, text: 'initializing your project' },
                  errors
                }
              )
            }
          />

        </div>
      </div>
      <FormBuilder
        formItems={
          formBuilderProjectsStartProps(
            {
              formData,
              categories: indexData.categories,
              multiple: true,
              removeItem: deleteProjectMedia,
              setFormData: cancelUpload,
              progress,
              handleBlur,
              handleChange,
              handleDateChange,
              btnMethod: () => setFormData({ ...formData, title: '' }),
              loading: { status: store?.project?.status, text: 'initializing your project' },
              loadingMedia: store.media?.status,
              errors
            }
          )
        }
      />

    </div>
  );

  return (
    <div className="content">
      <div className="row">
        <CollapsedBreadcrumbs max={2} current="Project information" />
      </div>
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20 bg-light">
          <h3 className="font-bold text-center text-dark border-bottom border-top-0  ">
            {projectTitle}
          </h3>
          <div className="row">
            <div className="col-4 accordion-div is-focus">
              <IconButton
                type="button"
              >
                <div className="radius50 w-2e h-2e center-items border-wema">
                  <Avatar
                    className="styled-mui"
                  >
                    1
                  </Avatar>
                </div>
              </IconButton>
            </div>
            <div className="col-4 accordion-div is-focus">
              <IconButton
                disabled={!(formData.summary?.length > 0
                      && formData.donationTarget)}
                type="button"
                onClick={() => history.push(`/project/create/form-2/${store?.data?.data?.id}`)}
              >
                <div className="radius50 w-2e h-2e center-items faint-border">

                  <Avatar
                    className="text-muted"
                  >
                    2
                  </Avatar>
                </div>
              </IconButton>
            </div>
          </div>

          <div className="login-form pb-5h">

            <div>
              <div className="text-wema">
                <p className="font-bold">
                  <span className="pr-1">Complete your</span>
                  <span className="">project</span>
                </p>
              </div>
              <hr />
            </div>

            {/* <PageTemp */}
            {/*  initial={initialTemp} */}
            {/*  view={initialTemp} */}
            {/*  isPending={loading} */}
            {/*  status={store?.project1?.status} */}
            {/* /> */}

            <div>
              <div className="my-3">
                <small>you can edit the name</small>
                <div>
                  <FormBuilder
                    formItems={
                      title(
                        {
                          formData,
                          removeItem: removeAtIndex,
                          handleBlur,
                          handleChange,
                          btnMethod: () => setFormData({ ...formData, title: '' }),
                          loading: { status: store?.status, text: 'initializing your project' },
                          errors
                        }
                      )
                    }
                  />

                </div>
              </div>
              <FormBuilder
                formItems={
                  formBuilderProjectsStartProps(
                    {
                      formData,
                      categories: indexData.categories,
                      multiple: true,
                      removeItem: deleteProjectMedia,
                      setFormData: cancelUpload,
                      progress,
                      handleBlur,
                      handleChange,
                      handleDateChange,
                      btnMethod: () => setFormData({ ...formData, title: '' }),
                      loading: { status: store?.project?.status, text: 'initializing your project' },
                      loadingMedia: store.media?.status,
                      errors
                    }
                  )
                }
              />

            </div>

            <div>

              <div className="float-md-right text-center">
                <button
                  title="save and continue"
                  className="btn btn-plain text-wema border-wema hover-wema mr-md-1 btn-small"
                  type="button"
                  disabled={store.project1?.status === 'pending' || formData?.donationTarget?.length < 1}
                  onClick={handleSave}
                >
                  Save and continue later
                </button>
              </div>
              <div className="float-md-right text-center">
                <button
                  className=" btn btn-small p-1 mr-1 float-md-right text-center"
                  type="button"
                  disabled={store?.project1?.status === 'pending' || formData?.donationTarget?.length < 1}
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>

              <div className="row">
                {
                  loading
                  && <Loader />
                }
              </div>
            </div>

            <Modal
              className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
              content={(
                <ModalTemplate
                  status={store?.project1?.status}
                  data={store?.project1?.data?.data}
                  handleClose={handleClose}
                  setShow={setShow}
                  text={text()}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Project1;
