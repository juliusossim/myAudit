import React, {
  useEffect, useCallback, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import FormBuilder from '../../components/form/builders/form';
import { validateField } from '../../utilities/validation';
import { camelToString, notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { formBuilderProjectsStartProps } from './constants/startProject1Props';
import {
  projectCategories, editProject1, uploadMedia, projectAction
} from '../../redux/actions/projectActions';
import { findItem } from '../../utilities/arrayOperations';
import ModalTemplate from '../../components/temps/modalTemps/temp';
import Loader from '../../components/microComponents/loader';
import { apiOptions } from '../../services/fetch';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Project1 = ({
  setAccordionTab, data, setData
}) => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.project);
  /* state */
  const [formData, setFormData] = useState({ ...data });
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const showUpload = (err) => notifier({
    type: 'error',
    title: 'error',
    text: 'media upload failed'
  });

  useEffect(() => {
    if (store.media.status === 'failed' && store?.project1?.status !== 'pending') {
      showUpload(store.media?.message);
    }
    return true;
  }, [store.media?.status]);

  useEffect(() => {
    if (store.deleteMedia.status === 'success') {
      removeAtIndex(formData.deleteMedia);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.deleteMedia?.status]);

  useEffect(() => {
    if (store.project1?.status === 'success' && formData.from !== 2) {
      setShow(true);
    }
    return true;
  }, [store.project1?.status]);

  const handleClose = () => {
    setShow(false);
    setLoading(false);
    if (formData.from !== 2) {
      window.location.replace('/');
    }
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
    const category = store?.projectCategories?.data?.data
      !== undefined && store?.projectCategories?.data?.data.filter(
      (cat) => cat.id === formData.categoryId
    );
    // const authUser = JSON.parse(localStorage.getItem('loginData'));
    if (stringDoesNotExist(tem.description)) {
      tem.description = `
  Hi my name is ${formData.creator?.fullName?.name || 'anonymous'},
  I am appealing to the general public to join in raising funds to support our ${category?.name || formData.title}
  `;
    }

    setFormData(tem);
    setData({ ...tem });
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
          pQuery: { mediaId: item.uri },
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
    setAccordionTab(2);
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
            formBuilderProjectsStartProps(
              {
                formData,
                categories: store?.projectCategories?.data?.data,
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

        <div className="float-right">
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
        <div className="float-right">
          <button
            className=" btn btn-small p-1 mr-1 float-right"
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
  );
};
export default Project1;
