import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import NewEngagementTemp from './temps/NewEngagementTemp';
import { notifier } from '../../utilities/stringOperations';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useStoreParams from '../../components/hooks/useStoreParams';
import { apiOptions } from '../../services/fetch';
import { projectAction } from '../../redux/actions/projectActions';

const NewEngagement = () => {
  const dispatch = useDispatch();
  /* state */
  const [formData, setFormData] = useState({ first_year: false, year: new Date() });
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [currentName, setCurrentName] = useState(0);
  const [clients, setClients] = useState([]);
  const [uploads, setUploads] = useState({});

  /* redux */
  const store = useSelector((state) => state.engagement);
  const store2 = useSelector((state) => state.users);
  const options = {
    action: 'CREATE_ENGAGEMENT',
    apiOpts: apiOptions({
      body: { ...formData, ...uploads, year: new Date(formData.year).getFullYear().toString() },
      endpoint: 'CREATE_ENGAGEMENT',
      auth: true,
      method: 'post'
    })
  };
  const {
    handleBlur, handleChange, status, handleChecked, create, data, backErrors, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store: store.engagement,
    setProgress,
    setCurrentName,
    action: 'CREATE_ENGAGEMENT',
    redirect: '/app/engagements'
  });
  const uploadsStore = useStoreParams(store.uploads);
  const pushUpdates = useUpdateStore;
  const pullClients = React.useCallback(() => {
    dispatch(projectAction(
      {
        action: 'CLIENTS',
        routeOptions: apiOptions({
          endpoint: 'CLIENTS',
          auth: true,
          method: 'get'
        })
      }
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (uploadsStore.status === 'failed') {
      notifier({
        title: 'Upload Failed',
        text: message || 'failed to upload file',
        type: 'error'
      });
      setErrors(uploadsStore.backErrors);
      pushUpdates([{
        data: uploadsStore.data,
        action: 'UPLOAD_MEDIA_COMPLETE'
      }], dispatch);
    }
    if (uploadsStore.status === 'success') {
      // if (!_.isEmpty(uploads[currentName])) {
      //   // images?.pop();
      //   setUploads({
      //     ...uploads,
      //     [currentName]: [...uploads[currentName], uploadsStore.data]
      //   });
      // } else {
      setUploads({
        ...uploads,
        [currentName]: uploadsStore.data.url
      });
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadsStore.status]);
  React.useEffect(() => {
    if (store2.clients?.status === 'initial') {
      pullClients();
    }
    if (store2.clients?.status === 'failed') {
      notifier({
        title: 'Upload Failed',
        text: message || 'failed to upload file',
        type: 'error'
      });
      setErrors(store2.clients?.backErrors);
      pushUpdates([{
        data: store2.clients?.data,
        action: 'CLIENTS_COMPLETE'
      }], dispatch);
    }
    if (store2.clients?.status === 'success') {
      setClients([...clients, ...store2.clients?.data?.data.clients]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store2.clients?.status]);
  React.useEffect(() => {
    if (store2.engagement?.status === 'failed') {
      notifier({
        title: 'Upload Failed',
        text: message || 'failed to upload file',
        type: 'error'
      });
      setErrors(store2.engagement?.errors);
      pushUpdates([{
        data: store2.engagement?.data,
        action: 'CLIENTS_COMPLETE'
      }], dispatch);
    }
    if (store2.clients?.status === 'success') {
      setClients([...clients, ...store2.clients?.data?.data.clients]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store2.clients?.status]);
  const handleDateChange = ({ date, name }) => {
    setFormData({ ...formData, [name]: date });
  };

  return (
    <div className="">
      <div className="d-flex ml-4 custom-top-bar justify-content-between">
        <div className="text-theme-black bold">
          ENGAGEMENT
        </div>
        <div>
          <Link to="/app/engagement/" className="text-theme-blue mr-1">Engagement</Link>
          <span className="text-theme-black">/ New Engagement</span>
        </div>
      </div>
      <div className="content">
        {
          status === 'pending'
            ? <Loader />
            : (
              <NewEngagementTemp
                formData={formData}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleChecked={handleChecked}
                create={create}
                uploads={uploads}
                loadingMedia={uploadsStore.status}
                // removeItem={removeItem}
                progress={progress}
                clients={clients}
                handleDateChange={handleDateChange}
              />
            )
        }
      </div>
    </div>
  );
};

export default NewEngagement;
