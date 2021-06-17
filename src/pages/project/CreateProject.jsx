import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash';
import FormBuilder from '../../components/form/builders/form';
import {
  validateField,
  canSubmit,
  mapBackendErrors
} from '../../utilities/validation';
import { camelToString, slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { uploadFile } from '../../services/fetch';
import formBuilderProjectsStartProps from './constants/startProject1Props';
import formBuilderProjectsStart2Props from './constants/startProject2Props';
import { createProject, editProject } from '../../redux/actions/projectActions';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CreateProject = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project.project);
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
  // const category = _.findLast()

  const defaultDescription = `
  Hi my name is ${user?.name || 'anonymous'}, I work at ${user?.company?.name}
  I am appealing to the general public to join in raising funds to support our 
  `;

  const handleCreateProject = () => {
    setShow(true);
    dispatch(createProject(formData));
  };
  const handleSave = () => {
    setShow(true);
    dispatch(editProject({ ...store.data.data, ...formData }));
  };
  const cancelUpload = () => {
    setFormData({ ...formData, file: '', logo_id: '' });
  };
  const handleClose = () => {
    setShow(false);
    // window.location.replace('/create-project');
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
    if (name === 'title') {
      dispatch(createProject({ [field]: value }));
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

  const modalTemplate = (
    <div className={
      // eslint-disable-next-line no-nested-ternary
      (store?.status === 'failed')
        ? 'mt-5 p-5'
        : (
          store?.status === 'pending'
            ? 'mt-5 p-5 '
            : 'mt-5 p-5 bg-wema'
        )
    }
    >
      <div className="text-white">
        {
          store?.status === 'pending'
          && (
            <div className="center-text text-success">
              Loading...
            </div>
          )
        }
        {
          store?.status !== 'pending'
          && (
            <div className="">
              <h5 className="center-text text-muted">{store?.status}</h5>
              <ul>
                {
                  store?.status === 'failed'
                    ? (
                      <div>
                        <ul>
                          {
                            mapBackendErrors(store?.data).map(
                              (err) => (
                                typeof err !== 'undefined' && (
                                  <li key={err} className="text-warning">
                                    {err}
                                  </li>
                                )
                              )
                            )
                          }
                        </ul>
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
                          store?.status === 'success'
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
  useEffect(() => {
    localforage.getItem('user').then((data) => {
      setUser(data?.data?.user);
    });
    // console.log(user);
    accordionTab === 1
      ? canSubmit(formData, errors, setSubmittable, 4)
      : canSubmit(formData, errors, setSubmittable, 3);
  }, [formData, errors, accordionTab, user]);

  return (
    <div className="content">
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="bold text-dark">Start Project</h3>
          <div className="row">
            <div className={`col-md-6 accordion-div  ${accordionTab === 1 && 'is-focus'}`}>
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
            <div className={`col-md-6 accordion-div  ${accordionTab === 2 && 'is-focus'}`}>
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
          </div>
          <div className="login-form pb-5h">

            {
              (
                <FormBuilder
                  formItems={
                    accordionTab === 1 ? formBuilderProjectsStartProps(
                      {
                        formData,
                        multiple: true,
                        removeItem: removeAtIndex,
                        setFormData: cancelUpload,
                        progress,
                        handleBlur,
                        handleChange,
                        handleDateChange,
                        errors
                      }
                    )
                      : formBuilderProjectsStart2Props(
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
              )
            }

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

                  <div className="col-md-8 flex float-right pb-md-3">
                    <button
                      className="w-50 btn-plain text-wema border-wema hover-wema mr-md-1 btn-small"
                      type="button"
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
                            className="w-75 btn btn-small float-right"
                            type="button"
                            // disabled={!submittable}
                            onClick={handleCreateProject}
                          >
                            Submit
                          </button>
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
        content={modalTemplate}
      />
    </div>
  );
};

export default CreateProject;
