import React, {
  useEffect, useCallback, useState, useMemo
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import addDays from 'date-fns/addDays';
import Moment from 'moment';
import FormBuilder from '../../components/form/builders/form';
import { validateField } from '../../utilities/validation';
import { camelToString, notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { title } from './constants/startProject1Props';
import {
  createProjectName
} from '../../redux/actions/projectActions';
import ModalTemplate from '../../components/temps/modalTemps/temp';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Init = ({ setAccordionTab, setData }) => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project.initProject);
  /* state */
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [proceed, setProceed] = useState(false);

  useEffect(() => {
    if (store?.status === 'failed' || store?.status === 'success') {
      setShow(true);
    }
  }, [store?.status]);
  // useEffect(() => debouncedChangeHandler.cancel(), []);

  const handleClose = () => {
    setData({ ...store?.data?.data, ...formData });
    setShow(false);
    setAccordionTab(1);
  };

  const handleSaveProgress = () => {
    if (!stringDoesNotExist(formData.title)) {
      dispatch(createProjectName(formData));
      setFormData({
        ...formData,
        file: [],
        summary: `${formData.title} is a project requesting public funding to...`,
        projectType: 10,
        categoryId: 10,
        location: 'Lagos',
        startDate: addDays(Moment.now(), 5),
        endDate: addDays(Moment.now(), 12)
      });
    }
  };
  const handleChange = (e) => {
    const {
      name, value
    } = e?.target;
    setFormData((state) => ({
      ...state,
      [name]: value
    }));
    return handleProgress(value);
  };

  const handleProgress = (name) => {
    setProceed(!stringDoesNotExist(name));
  };

  const debouncedChangeHandler = () => debounce((name) => handleProgress(name), 500);
  const handleBlur = (e, validations) => {
    const { name, value } = e.target;
    const field = camelToString(name);

    if (typeof field !== 'undefined') {
      setErrors(
        {
          ...errors,
          [name]: (
            validateField(validations, field, value)
          )
        }
      );
    }
  };

  const removeAtIndex = (item) => {
    const fileCopy = [...formData.file];
    const index = fileCopy.indexOf(item);
    fileCopy.splice(index, 1);
    setFormData({ ...formData, file: [...fileCopy] });
  };

  const text = () => `Your project ${formData.title} has been initialized`;

  return (
    <div className="login-form pb-5h">

      <div>
        <div className="text-wema">
          <h4>Initiate A New Project</h4>
          <p>Give your project a befitting headline</p>
        </div>
        <hr />
      </div>

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

      <div>

        <div className="float-right">
          <button
            title="save and continue"
            className=" btn-plain text-wema border-wema hover-wema mr-md-1 btn-small"
            type="button"
            disabled={!proceed || store?.status === 'pending' || store?.status === 'success'}
            onClick={handleSaveProgress}
          >
            <span className="pr-1">Initialize</span>
            { proceed && formData.title }
          </button>
        </div>
      </div>

      <Modal
        className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
        content={(
          <ModalTemplate
            status={store?.status}
            data={store?.data?.data}
            handleClose={handleClose}
            setShow={setShow}
            text={text()}
          />
        )}
      />
    </div>
  );
};
export default Init;
