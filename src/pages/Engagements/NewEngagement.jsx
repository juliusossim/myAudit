import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import NewEngagementTemp from './temps/newEngagement/NewEngagementTemp';
import { notifier } from '../../utilities/stringOperations';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useStoreParams from '../../components/hooks/useStoreParams';
import { apiOptions } from '../../services/fetch';
import { projectAction } from '../../redux/actions/projectActions';

const NewEngagement = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  /* state */
  const [formData, setFormData] = useState({ first_time: 0, year: new Date() });
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [currentName, setCurrentName] = useState(0);
  const [clients, setClients] = useState(['select a client']);
  const [uploads, setUploads] = useState({});

  /* redux */
  const store = useSelector((state) => state.engagement);
  const store2 = useSelector((state) => state.users.clients);
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
    store: store.newEngagement,
    setProgress,
    setCurrentName,
    action: 'CREATE_ENGAGEMENT_COMPLETE',
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
      pushUpdates([
        {
          data: uploadsStore.data,
          action: 'UPLOAD_MEDIA_COMPLETE'
        },
        {
          data,
          action: 'CREATE_ENGAGEMENT_COMPLETE'
        }
      ], dispatch);
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
    if (store2?.status === 'initial') {
      pullClients();
    }
    if (store2?.status === 'failed') {
      notifier({
        title: 'Connection Failed',
        text: message || 'Failed to pull your Clients. Please retry',
        type: 'error'
      });
      setErrors(store2?.backErrors);
      pushUpdates([{
        data: store2?.data,
        action: 'CLIENTS_COMPLETE'
      }], dispatch);
    }
    if (store2?.status === 'success') {
      if (isEmpty(store2?.data?.data.clients)) {
        notifier({
          title: 'No Clients',
          text: 'Please create a client for this engagement',
          type: 'info'
        });
        push('/app/clients/new-client');
      } else {
        const clientsData = store2.data?.data?.clients.map(({ id, name }) => ({
          name, id
        }));
        setClients([...clients, ...clientsData]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store2?.status]);

  React.useEffect(() => {
    if (status === 'failed') {
      notifier({
        title: 'Failed',
        text: message || 'failed to create engagement',
        type: 'error'
      });
      setErrors(backErrors);
      pushUpdates([{
        data: store2?.data,
        action: 'CREATE_ENGAGEMENT_COMPLETE'
      }], dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
                setFormData={setFormData}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleChecked={handleChecked}
                create={create}
                uploads={uploads}
                loadingMedia={uploadsStore.status}
                // removeItem={removeItem}
                progress={progress}
                setProgress={setProgress}
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
