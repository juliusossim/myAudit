import React, { useEffect, useCallback, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormBuilder from '../../components/form/builders/form';
import { canSubmit, mapBackendErrors, validateField } from '../../utilities/validation';
import { camelToString, stringDoesNotExist } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { uploadFile } from '../../services/fetch';
import formBuilderProjectsStartProps from './constants/startProject1Props';
import formBuilderProjectsStart2Props from './constants/startProject2Props';
import formBuilderProjectsPreviewProps from './constants/startProject3Props';
import {
  createProject, editProject, projectByStatus, submitProject, createProjectName
} from '../../redux/actions/projectActions';
import { findItem } from '../../utilities/arrayOperations';
import { projectCategories } from '../../utilities/dummyData';
import Creatable from '../../components/form/inputs/Creatable';

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
    file: [], projectType: 10, categoryId: 10, startDate: new Date(), endDate: new Date()
  });
  const [progress, setProgress] = useState(0);
  const [accordionTab, setAccordionTab] = useState(1);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [user, setUser] = useState(null);
  const [created, setCreated] = useState(false);

  const handleCreateProject = () => {
    setShow(true);
    setCreated(true);
    dispatch(createProject(formData));
  };
  const handleSubmitProject = () => {
    setShow(true);
    dispatch(submitProject(formData));
  };
  const handleSave = () => {
    setShow(true);
    const tem = { ...formData };
    delete tem.endDate;
    const payload = { ...store.project.data.data, ...tem };
    if (stringDoesNotExist(payload.description)) {
      const category = findItem(projectCategories, 'id', formData.categoryId);
      const authUser = JSON.parse(localStorage.getItem('loginData'));
      payload.description = `
  Hi my name is ${authUser?.name || 'anonymous'}, I work at ${authUser?.company?.name}
  I am appealing to the general public to join in raising funds to support our ${category?.name || formData.title}
  `;
    }
    dispatch(editProject(payload));
  };
  const cancelUpload = () => {
    setFormData({ ...formData, file: '', logo_id: '' });
  };
  const handleClose = () => {
    setShow(false);
    created && setAccordionTab(3);
  };
  const handleProgress = (val) => setProgress(val);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media' && formData.file.indexOf(files[0] === -1)) {
      setFormData({
        ...formData,
        file: [...formData.file, files[0]]
      });
      uploadFile({ file: files[0], handleProgress, url: 'Uploads/logo' });
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
  };
  const handleDateChange = ({ date, name }) => setFormData({ ...formData, [name]: date });

  const handleBlur = (e, validations) => {
    const { name, value } = e.target;
    const field = camelToString(name);
    if (name === 'title' && !stringDoesNotExist(value)) {
      dispatch(createProjectName({ [field]: value }));
    }

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
  const handleDisabled = () => {
    if (accordionTab === 1) {
      return setSubmittable((store.project.data.data.status === 'success' && formData.categoryId !== 10 && formData.donationTarget > 0));
    }
    return setSubmittable(!(store.project.data.data.status === 'success' && !stringDoesNotExist(formData.endDate) && !stringDoesNotExist(formData.projectAddress)));
  };

  const modalTemplate = (
    <div className={
      // eslint-disable-next-line no-nested-ternary
      (store.project?.status === 'failed')
        ? 'mt-5 p-5'
        : (
          store.project?.status === 'pending'
            ? 'mt-5 p-5 '
            : 'mt-5 p-5 bg-wema'
        )
    }
    >
      <div className="text-white">
        {
          store.project?.status === 'pending'
          && (
            <div className="center-text text-success">
              Loading...
            </div>
          )
        }
        {
          store.project?.status !== 'pending'
          && (
            <div className="">
              <h5 className="center-text text-muted">{store.project?.status}</h5>
              <ul>
                {
                  store.project?.status === 'failed'
                    ? (
                      <div>
                        {/* <ul> */}
                        {/*  { */}
                        {/*    mapBackendErrors(store?.data).map( */}
                        {/*      (err) => ( */}
                        {/*        typeof err !== 'undefined' && ( */}
                        {/*          <li key={`${new Date()}`} className="text-warning"> */}
                        {/*            {err} */}
                        {/*          </li> */}
                        {/*        ) */}
                        {/*      ) */}
                        {/*    ) */}
                        {/*  } */}
                        {/* </ul> */}
                        <button onClick={() => setShow(false)} type="button" className="btn w-25 center btn-small float-right">
                          Ok
                        </button>
                      </div>
                    )
                    : (
                      <p>
                        your account is created
                        you will now be redirected to your projects
                        {
                          store.project?.status === 'success'
                          && setTimeout(handleClose, 3000)
                        }
                      </p>
                    )
                }
              </ul>
            </div>
          )
        }
      </div>
    </div>
  );

  const removeAtIndex = (item) => {
    const fileCopy = [...formData.file];
    const index = fileCopy.indexOf(item);
    fileCopy.splice(index, 1);
    setFormData({ ...formData, file: [...fileCopy] });
  };

  const goBack = () => {
    setAccordionTab(1);
  };
  const fetchMyAPI = useCallback(async () => {
    dispatch(projectByStatus());
  }, []);
  useEffect(() => {
    localforage.getItem('user').then((data) => {
      setUser(data?.data?.user);
    });
    // handleDisabled();
    // fetchMyAPI();
    // accordionTab === 1
    //   ?  canSubmit(formData, errors, setSubmittable, 4)
    //   : canSubmit(formData, errors, setSubmittable, 3);
  }, [formData, errors, accordionTab, user]);

  // const projectStat = {
  //   storeIndex: 'email_templates',
  //   readApi: '/api/all-template',
  //   placeholder: 'Email Template',
  //   labelProp: 'name',
  //   value: 'id',
  //   helperText: 'select an email template for this cadence'
  // };
  const selectedOption = (item) => setFormData({ ...formData, ...item.data.data });
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
              <IconButton type="button" onClick={() => setAccordionTab(2)}>
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
            <div className="text-wema">
              <h4>Preview</h4>
              <p>Make all changes you consider necessary before submitting for approval</p>
            </div>
            <hr />
            {/* <Creatable */}
            {/*  prop={{ */}
            {/*    name: projectStat.labelProp, */}
            {/*    label: projectStat.placeholder, */}
            {/*    variant: 'standard', */}
            {/*    value: '' */}
            {/*  }} */}
            {/*  data={projectStat.template} */}
            {/*  selected={selectedOption} */}
            {/*  creatable */}
            {/*  api={fetchMyAPI} */}
            {/* /> */}
            {accordionTab === 1
            && (
              <FormBuilder
                formItems={
                  formBuilderProjectsStartProps(
                    {
                      formData,
                      multiple: true,
                      removeItem: removeAtIndex,
                      setFormData: cancelUpload,
                      progress,
                      handleBlur,
                      handleChange,
                      handleDateChange,
                      loading: store.project.status,
                      errors
                    }
                  )
                }
              />
            )}

            {accordionTab === 2
             && (
               <FormBuilder
                 formItems={
                   formBuilderProjectsStart2Props(
                     {
                       formData,
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
                      multiple: true,
                      removeItem: removeAtIndex,
                      setFormData: cancelUpload,
                      progress,
                      handleBlur,
                      handleChange,
                      handleDateChange,
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
                            // disabled={submittable}
                            onClick={handleSave}
                          >
                            Save
                          </button>
                          {
                            accordionTab === 1
                              ? (
                                <button
                                  className="w-75 btn btn-small float-right"
                                  type="button"
                                  // disabled={!submittable}
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
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <Modal
        className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
        content={modalTemplate}
      />
    </div>
  );
};

export default CreateProject;
