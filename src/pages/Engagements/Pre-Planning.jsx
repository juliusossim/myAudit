/* dependencies */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import NewEngagementTemp from './temps/newEngagement/NewEngagementTemp';
import { stringDoesNotExist } from '../../utilities/stringOperations';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useStoreParams from '../../components/hooks/useStoreParams';
import { apiOptions } from '../../services/fetch';
import { projectAction } from '../../redux/actions/projectActions';
import useFetchData from '../../components/hooks/useFetchData';

/* component */
const NewEngagement = () => {
  /* redux hooks */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.engagement);
  const store2 = useSelector((state) => state.users);

  /* router hooks */
  const { push } = useHistory();
  const { engagementId } = useParams();

  /* state */
  const [formData, setFormData] = useState({ first_time: 0, year: new Date(), external_expert: 0 });
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [currentName, setCurrentName] = useState(0);
  const [clients, setClients] = useState(['select a client']);
  const [uploads, setUploads] = useState({});

  /* boilerPlate hooks params */
  const options = {
    action: 'CREATE_ENGAGEMENT',
    apiOpts: apiOptions({
      body: { ...formData, ...uploads, year: new Date(formData.year).getFullYear().toString() },
      endpoint: 'CREATE_ENGAGEMENT',
      auth: true,
      method: 'post'
    })
  };
  const pushUpdatesArr = [
    {
      data: store?.engagements?.data?.data,
      action: 'ENGAGEMENTS_COMPLETE'
    }
  ];

  /* boilerPlate hooks */
  const {
    handleBlur, handleChange, status, handleChecked, create, data
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store: store.newEngagement,
    setProgress,
    setCurrentName,
    pushUpdatesArr,
    action: 'CREATE_ENGAGEMENT_COMPLETE',
    redirect: '/app/engagements'
  });
  const uploadsStore = useStoreParams(store.uploads);
  const engagementStore = useStoreParams(store.engagement);
  const clientsStore = useStoreParams(store2.clients);

  /* custom hooks params */
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
  const pullEngagement = React.useCallback(() => {
    dispatch(projectAction(
      {
        action: 'ENGAGEMENT',
        routeOptions: apiOptions({
          endpoint: 'ENGAGEMENT',
          param: engagementId,
          auth: true,
          method: 'get'
        })
      }
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const uploadMediaFail = () => {
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
  };
  const uploadMediaSuccess = () => setUploads({
    ...uploads,
    [currentName]: uploadsStore.data.url
  });
  const clientsFail = () => {
    setErrors(store2?.backErrors);
    pushUpdates([{
      data: clientsStore?.data,
      action: 'CLIENTS_COMPLETE'
    }], dispatch);
  };
  const clientsSuccess = () => {
    const clientsData = clientsStore?.data?.clients?.map(({ id, name }) => ({
      name, id
    }));
    setClients(clientsData);
  };
  const engagementFail = () => {
    setErrors(engagementStore?.backErrors);
    pushUpdates([{
      data: engagementStore?.data,
      action: 'ENGAGEMENT_COMPLETE'
    }], dispatch);
  };
  const engagementSuccess = () => setFormData(engagementStore?.data?.engagement);

  /* custom hooks */
  const pushUpdates = useUpdateStore;
  const fetchData = useFetchData;
  fetchData({
    initialCallback: pullClients,
    push,
    dataIndex: 'clients',
    successCallback: clientsSuccess,
    emptyRedirect: '/app/clients/new-client',
    emptyMsg: 'Please create a client for this engagement',
    failCallback: clientsFail,
    store: clientsStore
  });
  fetchData({
    push,
    successCallback: uploadMediaSuccess,
    failCallback: uploadMediaFail,
    store: uploadsStore
  });

  // /* react hooks */
  useEffect(() => {
    if (!stringDoesNotExist(engagementId)) {
      fetchData({
        initialCallback: pullEngagement,
        push,
        dataIndex: 'engagement',
        successCallback: engagementSuccess,
        emptyRedirect: '/app/engagement/new-engagement',
        failCallback: engagementFail,
        store: engagementStore
      });
    }
  }, [engagementId]);

  /* component methods */
  const handleDateChange = ({ date, name }) => {
    setFormData({ ...formData, [name]: date });
  };
  const updateEngagement = React.useCallback(() => {
    dispatch(projectAction(
      {
        action: 'ENGAGEMENT',
        routeOptions: apiOptions({
          endpoint: 'ENGAGEMENT',
          param: engagementId,
          auth: true,
          method: 'get'
        })
      }
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createUpdate = stringDoesNotExist(engagementId) ? create : updateEngagement;

  /* jsx */
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
                create={createUpdate}
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
