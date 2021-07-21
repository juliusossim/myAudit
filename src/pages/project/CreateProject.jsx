import React, {
  useEffect, useCallback, useState
} from 'react';
import localforage from 'localforage';
import addDays from 'date-fns/addDays';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NaijaStates from 'naija-state-local-government';
import FormBuilder from '../../components/form/builders/form';
import { validateField } from '../../utilities/validation';
import { camelToString, notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { formBuilderProjectsStartProps, title } from './constants/startProject1Props';
import formBuilderProjectsStart2Props from './constants/startProject2Props';
import formBuilderProjectsPreviewProps from './constants/startProject3Props';
import {
  projectCategories, editProject, projectByStatus, submitProject, createProjectName, uploadLogo
} from '../../redux/actions/projectActions';
import { findItem } from '../../utilities/arrayOperations';
import ModalTemplate from '../../components/temps/modalTemps/temp';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CreateProject = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  /* state */
  const [formData, setFormData] = useState({
    file: [], projectType: 10, categoryId: 10, location: 'lagos', startDate: addDays(Moment.now(), 5), endDate: new Date()
  });
  const [progress, setProgress] = useState(0);
  const [accordionTab, setAccordionTab] = useState(1);
  // const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [user, setUser] = useState(null);
  const [created, setCreated] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [lgas, setLgas] = useState([]);
  const [states, setStates] = useState([]);
  const [init, setInit] = useState(true);
  const [skeleton, setSkeleton] = useState(false);

  const handleCreateProject = () => {
    setCreated(true);
    handleSave();

    // dispatch(createProject(formData));
  };
  const handleSubmitProject = () => {
    const tem = {
      ...formData
    };
    if (formData.donationTarget !== undefined && typeof formData.donationTarget === 'string') {
      const targetAmount = () => formData.donationTarget.replace(/[^\d.]/g, '');
      tem.donationTarget = Number(targetAmount());
    }
    dispatch(submitProject(tem));
  };
  const handleSave = () => {
    const tem = {
      ...formData
    };
    if (formData.donationTarget !== undefined && typeof formData.donationTarget === 'string') {
      const targetAmount = () => formData.donationTarget.replace(/[^\d.]/g, '');
      tem.donationTarget = Number(targetAmount());
    }
    const category = store?.projectCategories?.data?.data !== undefined && findItem(store?.projectCategories?.data?.data, 'id', formData.categoryId);
    // const authUser = JSON.parse(localStorage.getItem('loginData'));
    if (stringDoesNotExist(tem.description)) {
      tem.description = `
  Hi my name is ${user?.name || 'anonymous'}, I work at ${user?.company?.name}
  I am appealing to the general public to join in raising funds to support our ${category?.name || formData.title}
  `;
    }
    console.log(tem);
    setFormData(tem);
    dispatch(editProject(tem));
  };
  const cancelUpload = () => {
    setFormData({ ...formData, file: '', logo_id: '' });
  };
  const handleClose = () => {
    setShow(false);
    // accordionTab === 3 && window.location.replace('/me');
    if (created && accordionTab === 2) {
      setAccordionTab(3);
    }
  };

  const handleProgress = (val) => setProgress(val);
  const handleSaveProgress = () => {
    if (!stringDoesNotExist(formData.title)) {
      setNameEdit(true);
      if (init) {
        setCreated(false);
        dispatch(createProjectName(formData));
        setFormData({ ...formData, summary: `${formData.title} is a project requesting public funding to...` });
      } else {
        handleSave();
      }
    }
  };
  const replacedName = (name, apiValue) => {
    if (apiValue) {
      if (name === 'city') {
        return ({ lga: apiValue });
      }
      if (name === 'location') {
        return ({ state: apiValue });
      }
    }
    return {};
  };
  const handleChange = (e) => {
    const {
      name, value, files, apiValue
    } = e?.target;
    handleNameEdit(name);
    if (name === 'media' && formData.file.indexOf(files[0] === -1)) {
      const fileSize = (files[0].size / 1024 / 1024).toFixed(3);
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
        uploadLogo(
          {
            payload: { file: files[0], id: store.project.data.data.id }, setProgress
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
  const handleDateChange = ({ date, name }) => {
    setFormData({ ...formData, [name]: date });
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
  const handleNameEdit = useCallback((name) => {
    if (name !== 'title') {
      setNameEdit(false);
    }
  }, [nameEdit]);

  const handleDisabled = () => {
    if (accordionTab === 1) {
      if ((formData.donationTarget > 0)) {
        setSubmittable(true);
      }
    }
    return setSubmittable(!(created && !stringDoesNotExist(formData.endDate)
      && !stringDoesNotExist(formData.projectAddress)));
  };

  const removeAtIndex = (item) => {
    const fileCopy = [...formData.file];
    const index = fileCopy.indexOf(item);
    fileCopy.splice(index, 1);
    setFormData({ ...formData, file: [...fileCopy] });
  };
  const canContinue = () => !(formData.summary?.length > 0
    && formData.donationTarget
    && store?.project?.data?.data?.id?.length > 0);

  const goBack = () => {
    setAccordionTab(1);
  };
  const fetchMyAPI = useCallback(async () => {
    dispatch(projectByStatus());
  }, []);

  const text = () => {
    let strings = 'your project has been submitted for approval. You will be notified by email in due time';

    if (accordionTab !== 3) {
      if (store?.project?.data?.data?.id !== undefined) {
        strings = `Your project ${formData.title} has been saved`;
      } else {
        strings = `Your project ${formData.title} has been initialized`;
      }
    }
    return strings;
  };

  const mapIndex = (arr) => arr.map((ar, index) => ({
    value: index + 1,
    name: ar
  }));

  const mapAllStates = (allStates) => allStates.map((item, index) => ({
    [index + 1]: item.lgas
  }));

  useEffect(() => {
    if (formData?.id === undefined && store.data?.data?.id === undefined) {
      setInit(true);
    } else if (formData?.id !== undefined || store.data?.data?.id !== undefined) {
      setInit(false);
    }
    setLgas(mapIndex(NaijaStates.lgas(formData.location)?.lgas));
    setStates(mapIndex(NaijaStates.states()));
    console.log(JSON.stringify(mapAllStates(NaijaStates.all())));
  }, [formData]);

  useEffect(() => {
    setFormData({ ...formData, endDate: addDays(new Date(formData.startDate), 7) });
  }, [formData.startDate]);

  useEffect(() => {
    localforage.getItem('user').then((data) => {
      setUser(data?.data?.user);
    });
    dispatch(projectCategories());
  }, []);
  useEffect(() => {
    if (store.project?.status === 'failed' || store.project?.status === 'success') {
      setShow(true);
    }
    if (store.project?.status === 'success' && store.project?.data?.data?.id !== undefined) {
      setFormData({
        ...store?.project?.data?.data,
        id: store?.project?.data?.data?.id,
        ...formData
      });
      setSkeleton(true);
    } else {
      setSkeleton(false);
    }
  }, [store.project.status]);
  return (
    <div className="content">
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="bold text-dark">
            {
              accordionTab !== 3
                ? 'Create Project'
                : 'Start Project'
            }
          </h3>
          <div className="row">
            <div className={`col-md-4 accordion-div  ${accordionTab === 1 && 'is-focus'}`}>
              <IconButton type="button" onClick={() => setAccordionTab(1)}>
                <div className={`radius50 w-2e h-2e center-items ${accordionTab === 1 ? 'border-wema' : 'faint-border'}`}>

                  <Avatar
                    className={
                      accordionTab === 1 ? 'styled-mui' : 'text-muted'
                    }
                  >
                    1
                  </Avatar>
                </div>
              </IconButton>
            </div>
            <div className={`col-md-4 accordion-div  ${accordionTab === 2 && 'is-focus'}`}>
              <IconButton
                disabled={!(formData.summary?.length > 0
                && formData.donationTarget
                && store?.project?.data?.data?.id?.length > 0)}
                type="button"
                onClick={() => setAccordionTab(2)}
              >
                <div className={`radius50 w-2e h-2e center-items ${accordionTab === 2 ? 'border-wema' : 'faint-border'}`}>

                  <Avatar
                    className={
                      accordionTab === 2 ? 'styled-mui' : 'text-muted'
                    }
                  >
                    2
                  </Avatar>
                </div>
              </IconButton>
            </div>
            <div className={`col-md-4 accordion-div  ${accordionTab === 3 && 'is-focus'}`}>
              <IconButton type="button" onClick={() => setAccordionTab(3)}>
                <div className={`radius50 w-2e h-2e center-items ${accordionTab === 3 ? 'border-wema' : 'faint-border d-none'}`}>

                  <Avatar
                    className={
                      accordionTab === 3 ? 'styled-mui' : 'text-muted'
                    }
                  >
                    3
                  </Avatar>
                </div>
              </IconButton>
            </div>
          </div>
          <div className="login-form pb-5h">
            {
              accordionTab === 3
              && (
                <div>
                  <div className="text-wema">
                    <h4>Preview</h4>
                    <p>Make all changes you consider necessary before submitting for approval</p>
                  </div>
                  <hr />
                </div>
              )
            }
            {
              accordionTab === 1 && store.project?.data?.data?.id === undefined
              && (
                <div>
                  <div className="text-wema">
                    <h4>Initiate A New Project</h4>
                    <p>Give your project a befitting headline</p>
                  </div>
                  <hr />
                </div>
              )
            }

            {accordionTab === 1
            && (
              <div>
                {
                  init
                    ? (
                      <FormBuilder
                        formItems={
                          title(
                            {
                              formData,
                              categories: store?.projectCategories?.data?.data,
                              multiple: true,
                              removeItem: removeAtIndex,
                              setFormData: cancelUpload,
                              progress,
                              handleBlur,
                              handleChange,
                              handleDateChange,
                              btnMethod: () => setFormData({ ...formData, title: '' }),
                              loading: { status: nameEdit && store?.project?.status, text: 'initializing your project' },
                              errors
                            }
                          )
                        }
                      />
                    )
                    : (
                      <FormBuilder
                        formItems={
                          formBuilderProjectsStartProps(
                            {
                              formData,
                              categories: store?.projectCategories?.data?.data,
                              multiple: true,
                              removeItem: removeAtIndex,
                              setFormData: cancelUpload,
                              progress,
                              handleBlur,
                              handleChange,
                              handleDateChange,
                              btnMethod: () => setFormData({ ...formData, title: '' }),
                              loading: { status: nameEdit && store?.project?.status, text: 'initializing your project' },
                              errors
                            }
                          )
                        }
                      />
                    )
                }
              </div>
            )}

            {accordionTab === 2
             && (
               <FormBuilder
                 formItems={
                   formBuilderProjectsStart2Props(
                     {
                       formData,
                       states,
                       lgas,
                       skeleton: store?.project?.data?.data?.id,
                       excuseSkeleton: 'title',
                       handleBlur,
                       handleChange,
                       handleDateChange,
                       errors
                     }
                   )
                 }
               />
             )}
            {accordionTab === 3
              && (
                <FormBuilder
                  formItems={
                    formBuilderProjectsPreviewProps({
                      formData,
                      categories: store.projectCategories.data.data,
                      multiple: true,
                      removeItem: removeAtIndex,
                      skeleton: store?.project?.data?.data?.id,
                      excuseSkeleton: 'title',
                      setFormData: cancelUpload,
                      progress,
                      handleBlur,
                      handleChange,
                      handleDateChange,
                      btnMethod: () => setFormData({ ...formData, title: '' }),
                      loading: { status: nameEdit && store.project.status, text: 'initializing your project' },
                      errors
                    })
                  }
                />
              )}

            {
              (
                <div>
                  {
                    accordionTab === 2
                    && (
                      <button type="button" onClick={goBack} className="text-wema w-25 viewMoreBtn">
                        &lt; back
                      </button>
                    )
                  }

                  <div className="col-md-8 float-right pb-md-3">
                    {
                      accordionTab !== 3
                      && (
                        <div className="flex">
                          <button
                            title="save and continue later"
                            className="w-50 btn-plain text-wema border-wema hover-wema mr-md-1 btn-small"
                            type="button"
                            // disabled={!store?.project?.data?.data?.id?.length > 0}
                            onClick={handleSaveProgress}
                          >
                            Save
                          </button>
                          {
                            accordionTab === 1
                              ? (
                                <button
                                  className="w-75 btn btn-small float-right"
                                  type="button"
                                  disabled={!(formData.summary?.length > 0
                                    && formData.donationTarget
                                    && formData?.id?.length > 0)}
                                  onClick={() => setAccordionTab(2)}
                                >
                                  Continue
                                </button>
                              )
                              : (
                                <button
                                  title="submit for approval"
                                  className="w-75 btn btn-small float-right"
                                  type="button"
                                  // disabled={!submittable}
                                  onClick={handleCreateProject}
                                >
                                  Done
                                </button>
                              )
                          }
                        </div>
                      )
                    }
                    {
                      accordionTab === 3
                      && <Button onClick={handleSubmitProject}>Submit</Button>
                    }
                    {
                      store.project.status === 'pending' && !nameEdit
                    && (
                      <div className="dots_loader d-flex">

                        {
                          accordionTab !== 3
                          && <p className="mr-md-1 pb-md-1"> saving your progress </p>
                        }
                        {
                          accordionTab === 3
                          && <p className="mr-md-1 pb-md-1"> submitting...</p>
                        }

                        <div className="mt-md-1">
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    )
                    }
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <Modal
        className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
        content={(
          <ModalTemplate
            status={store.project?.status}
            data={store.project?.data?.data}
            handleClose={handleClose}
            setShow={setShow}
            text={text()}
          />
        )}
      />
    </div>
  );
};

export default CreateProject;
