import React, {
  useEffect, useCallback, useState
} from 'react';
import _ from 'lodash';
import localforage from 'localforage';
import addDays from 'date-fns/addDays';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import NaijaStates from 'naija-state-local-government';
import {
  Link, Redirect, useHistory, useLocation, useParams
} from 'react-router-dom';
import { BiArrowBack } from 'react-icons/all';
import FormBuilder from '../../components/form/builders/form';
import { validateField } from '../../utilities/validation';
import { camelToString, notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { formBuilderProjectsStartProps, title } from './constants/startProject1Props';
import formBuilderProjectsStart2Props from './constants/startProject2Props';
import formBuilderProjectsPreviewProps from './constants/startProject3Props';
import {
  editProject, getProject
} from '../../redux/actions/projectActions';
import { findItem } from '../../utilities/arrayOperations';
import ModalTemplate from '../../components/temps/modalTemps/temp';
import Loader from '../../components/microComponents/loader';
import SimpleSnackbar from '../../components/microComponents/snackBar';
import CollapsedBreadcrumbs from '../../layouts/Breadcrumb';
import PageTemp from '../../components/temps/PageTemp';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Project2 = () => {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  /* state */
  const [formData, setFormData] = useState({ ...location.state.data });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lgas, setLgas] = useState([]);
  const [states, setStates] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [minDate, setMinDate] = useState(new Date());
  const [minStartDate] = useState(addDays(Moment.now(), 3));

  const mapIndex = (arr) => arr.map((ar, index) => ({
    value: index + 1,
    name: ar
  }));
  const indexData = { ...JSON.parse(localStorage.getItem('index')) };

  useEffect(() => {
    if (!_.isEmpty(indexData?.states)) {
      setStates(indexData.states);
      setLgas(indexData.states?.filter(
        (ste) => ste.stateId === (formData.stateId || 1)
      )[0].lgas);
    }
  }, [formData]);

  useEffect(() => {
    setFormData({ ...formData, endDate: addDays(new Date(formData.startDate), 7) });
    setMinDate(addDays(new Date(formData.startDate), 7));
  }, [formData.startDate]);

  useEffect(() => {
    if (store.project?.status === 'failed') {
      notifier({
        type: 'error',
        title: 'Progress Failed To Save',
        text: `Your project ${formData.title} could not be updated. Try again`
      });
    }
    if (store.project?.status === 'success') {
      notifier({
        type: 'success',
        title: 'Project Saved',
        text: `Kindly review your project ${formData.title}`
      });
      setTimeout(() => handleClose(), 1000);
    }
  }, [store.project.status]);

  useEffect(() => {
    if (store.project1?.status === 'failed') {
      setOpenSnack(true);
      setMessage('your progress is not saved');
    } else if (store.project1?.status === 'success') {
      setOpenSnack(true);
      setMessage('your progress is saved');
    }
  }, [store.project1.status]);

  const handleClose = () => {
    setShow(false);
    // console.log(formData, store.data.data);
    window.location.assign(`/review/project/${id}`);
    // history.push(`/review/project/${id}`);
    // return <Redirect to={`/review/project/${formData.id}`} />;
  };

  const handleDateChange = ({ date, name }) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSave = () => {
    const tem = {
      ...formData
    };
    if (formData.donationTarget !== undefined && typeof formData.donationTarget === 'string') {
      const targetAmount = () => formData.donationTarget.replace(/[^\d.]/g, '');
      tem.donationTarget = Number(targetAmount());
    }
    // setFormData(tem);
    dispatch(editProject({ ...tem, id }));
  };
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
      name, value, apiValue
    } = e?.target;
    return setFormData((state) => ({
      ...state,
      ...replacedName(name, apiValue),
      [name]: value
    }));
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

  const text = () => `Your project ${formData.title} has been updated`;

  return (
    <div className="content">
      <div className="row">
        <CollapsedBreadcrumbs max={2} current="Project address and duration" />
      </div>
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20 bg-light">
          <h3 className="font-bold text-center text-dark border-bottom border-top-0  ">
            {formData.title}
          </h3>
          <div className="row">
            <div className="col-4 accordion-div is-focus">
              <IconButton
                type="button"
                onClick={() => history.push({
                  pathname: `/project/create/form-1/${id}/${formData.title}`,
                  state: {
                    prevPath: location.pathname,
                    data: formData
                  }
                })}
              >
                <div className="radius50 w-2e h-2e center-items faint-border">

                  <Avatar
                    className="text-muted"
                  >
                    1
                  </Avatar>
                </div>
              </IconButton>
            </div>
            <div className="col-4 accordion-div is-focus">
              <IconButton
                type="button"
              >
                <div className="radius50 w-2e h-2e center-items border-wema">
                  <Avatar
                    className="styled-mui"
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
                  {/* <span className="pr-1 bold">{formData.title}</span> */}
                  <span className="">project</span>
                </p>
              </div>
              <hr />
            </div>

            <div className="row">
              <FormBuilder
                formItems={
                  formBuilderProjectsStart2Props(
                    {
                      formData,
                      states,
                      lgas,
                      minDate,
                      minStartDate,
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

            </div>

            <div className="row justify-content-between">
              <div>
                <Link
                  to={{
                    pathname: `/project/create/form-1/${id}/${formData.title}`,
                    state: {
                      prevPath: location.pathname,
                      data: formData
                    }
                  }}
                  title="save and preview"
                  className=" btn-plain  text-wema border-wema hover-wema mr-md-1"
                  type="button"
                  disabled={store?.project?.status === 'pending'}
                >
                  <BiArrowBack />
                </Link>
              </div>

              <div className="">
                <button
                  title="save and preview"
                  className=" btn-plain text-wema border-wema hover-wema mr-md-1 btn-small"
                  type="button"
                  disabled={store?.project?.status === 'pending'}
                  onClick={handleSave}
                >
                  Preview
                </button>
              </div>

              <div className="row">
                {
                  store?.project?.status === 'pending'
                  && <Loader />
                }
              </div>
            </div>
            <SimpleSnackbar message={message} open={openSnack} setOpen={setOpenSnack} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Project2;
