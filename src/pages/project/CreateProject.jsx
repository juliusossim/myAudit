import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormBuilder from '../../components/form/builders/form';
import { validateField, canSubmit, mapBackendErrors } from '../../utilities/validation';
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { register } from '../../redux/actions/authenticationActions';
import { uploadFile } from '../../services/fetch';
import formBuilderProjectsStartProps from './constants/startProject1Props';
import formBuilderProjectsStart2Props from './constants/startProject2Props';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const CreateProject = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.register);
  /* state */
  const [formData, setFormData] = useState({ file: [], project_type: 'select project type' });
  const [file, setFile] = useState([]);
  const [progress, setProgress] = useState(0);
  const [accordionTab, setAccordionTab] = useState(1);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const handleRegister = () => {
    setShow(true);
    dispatch(register(formData, formData?.project_type));
  };
  const cancelUpload = () => {
    setFormData({ ...formData, file: '', logo_id: '' });
  };
  const handleClose = () => {
    setShow(false);
    window.location.replace('/create-project');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'project_media') {
      setFormData({
        ...formData,
        file: [...formData.file, files[0]]
      });
      uploadFile(files[0], setProgress);
    } else {
      setFormData((state) => ({
        ...state,
        [name]: value
      }));
    }
  };

  const handleBlur = (e, validations) => {
    const { name, value } = e.target;
    const field = slugToString(name);
    // console.log(typeof field !== 'undefined');
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
    // setFormData({
    //   ...formData,
    //   project_type: 'select project type',
    //   // project_media: ''
    // });
    setAccordionTab(1);
  };
  // useEffect(() => {
  //   console.log(file);
  //   progress === 100
  //   && setFormData({ ...formData, file: URL.createObjectURL(file[0]) });
  // }, [file, progress]);
  useEffect(() => {
    accordionTab === 1
      ? canSubmit(formData, errors, setSubmittable, 4)
      : canSubmit(formData, errors, setSubmittable, 3);
  }, [formData, errors, accordionTab]);

  return (
    <div className="content">
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="bold text-dark">Start Project</h3>
          <div className="row">
            <div className={`col-md-6 accordion-div  ${accordionTab === 1 && 'is-focus'}`}>
              <div className={`radius50 size4 center-items ${accordionTab === 1 ? 'border-wema' : 'faint-border'}`}>
                <button type="button" className={`radius50 size3 text-center  ${accordionTab === 1 ? 'bg-wema text-white' : 'text-muted'}`} onClick={() => setAccordionTab(1)}>1</button>
              </div>
            </div>
            <div className={`col-md-6 accordion-div  ${accordionTab === 2 && 'is-focus'}`}>
              <div className={`radius50 size4 center-items ${accordionTab === 2 ? 'border-wema' : 'faint-border'}`}>
                <button type="button" className={`radius50 size3 text-center text-white  ${accordionTab === 2 ? 'bg-wema text-white' : 'text-muted'}`} onClick={() => setAccordionTab(2)}>2</button>
              </div>
            </div>
          </div>
          <div className="login-form">

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
                        errors
                      }
                    )
                      : formBuilderProjectsStart2Props(
                        {
                          formData,
                          handleBlur,
                          handleChange,
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
                      onClick={handleRegister}
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
                            onClick={handleRegister}
                          >
                            Start Project
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
