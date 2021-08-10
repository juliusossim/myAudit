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
import { Link, Redirect } from 'react-router-dom';
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

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Project2 = ({ data, setData }) => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  /* state */
  const [formData, setFormData] = useState({ ...data });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [lgas, setLgas] = useState([]);
  const [states, setStates] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [minDate, setMinDate] = useState(new Date());
  const [minStartDate] = useState(addDays(Moment.now(), 5));

  const mapIndex = (arr) => arr.map((ar, index) => ({
    value: index + 1,
    name: ar
  }));

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info('reloaded');
      dispatch(getProject(formData.id));
    }
  }, []);
  useEffect(() => {
    if (store.stateLga.status === 'success') {
      setStates(store?.stateLga?.data?.data);
      setLgas(store?.stateLga?.data?.data?.filter(
        (ste) => ste.stateId === (formData.stateId || 1)
      )[0].lgas);
    }
  }, [store.stateLga.status, formData]);

  useEffect(() => {
    setFormData({ ...formData, endDate: addDays(new Date(formData.startDate), 7) });
    setMinDate(addDays(new Date(formData.startDate), 7));
  }, [formData.startDate]);

  useEffect(() => {
    if (store.project?.status === 'failed' || store.project?.status === 'success') {
      setShow(true);
    }
  }, [store.project.status]);

  useEffect(() => {
    if (store.project1?.status === 'failed') {
      setOpenSnack(true);
      setMessage('your progress is not saved');
    } else if (store.project1?.status === 'success') {
      setOpenSnack(true);
      setMessage('your previous step progress is saved');
    }
  }, [store.project1.status]);

  const handleClose = () => {
    setShow(false);
    // console.log(formData, store.data.data);
    setData({ ...formData, ...store.data?.data });
    window.location.replace(`/create-project/${formData.id}/3`);
    // return <Redirect to={`/create-project/${formData.id}/3`} />;
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
    dispatch(editProject(tem));
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
    <div className="login-form pb-5h">

      <div>
        <div className="text-wema">
          <h4>
            <span className="pr-1">Complete your</span>
            <span className="pr-1 bold">{formData.title}</span>
            <span className="">project</span>
          </h4>
        </div>
        <hr />
      </div>

      <div>
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

      <div>

        <div className="float-right">
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

      <Modal
        className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
        content={(
          <ModalTemplate
            status={store?.project?.status}
            data={store?.project?.data?.data}
            handleClose={handleClose}
            setShow={setShow}
            text={text()}
          />
        )}
      />
    </div>
  );
};
export default Project2;
