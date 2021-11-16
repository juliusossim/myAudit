import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useHistory, useParams } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import NewEngagementTemp from './temps/newEngagement/NewEngagementTemp';
import { notifier } from '../../utilities/stringOperations';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useStoreParams from '../../components/hooks/useStoreParams';
import { apiOptions } from '../../services/fetch';
import { projectAction } from '../../redux/actions/projectActions';
import PlanningTemp from './temps/planning/PlanningTemp';

const NewEngagement = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { id, engagementName, year } = useParams();
  /* state */
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [currentName, setCurrentName] = useState(0);
  const [users, setUsers] = useState(['select a client']);
  const [uploads, setUploads] = useState({});

  /* redux */
  const store = useSelector((state) => state.engagement);
  const store2 = useSelector((state) => state.users.users);
  const options = {
    action: 'PLANNING',
    apiOpts: apiOptions({
      body: { ...formData, ...uploads, year: new Date(formData.year).getFullYear().toString() },
      endpoint: 'ENGAGEMENT',
      param: id,
      afterParam: 'plannings',
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
    action: 'PLANNING'
    // redirect: '/app/engagements'
  });
  const uploadsStore = useStoreParams(store.uploads);
  const pushUpdates = useUpdateStore;
  const pullUsers = React.useCallback(() => {
    dispatch(projectAction(
      {
        action: 'USERS',
        routeOptions: apiOptions({
          endpoint: 'USERS',
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
      pullUsers();
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
      // if (isEmpty(store2?.data?.data.users)) {
      // notifier({
      //   title: 'No Clients',
      //   text: 'Please create a client for this engagement',
      //   type: 'info'
      // });
      // push('/app/dashboard/invite-user');
      // } else {
      const usersData = store2.data?.data?.users.map((item) => ({
        name: item
      }));
      setUsers([...users, ...usersData]);
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store2?.status]);

  React.useEffect(() => {
    if (status === 'success') {
      pushUpdates([
        {
          data: store?.engagements?.data?.data,
          action: 'ENGAGEMENTS_COMPLETE'
        },
        {
          data,
          action: 'PLANNING_COMPLETE'
        }
      ], dispatch);
    }
    if (status === 'failed') {
      notifier({
        title: 'Failed',
        text: message || 'failed to create planning',
        type: 'error'
      });
      setErrors(backErrors);
      pushUpdates([{
        data,
        action: 'PLANNING_COMPLETE'
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
        <div className="">
          <span className="theme-font-bold text-theme-black mr-1">{engagementName}</span>
          <span className="theme-font-bold text-theme-black mr-1">{`- ${year}`}</span>
        </div>
        <div>
          <Link to="/app/engagement/" className="text-theme-blue mr-1">Engagements</Link>
          <span className="text-theme-black">/ Engagement</span>
        </div>
      </div>
      <div className="content">
        {
          status === 'pending'
            ? <Loader />
            : (
              <PlanningTemp
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleChecked={handleChecked}
                create={create}
                uploads={uploads}
                loadingMedia={uploadsStore.status}
                progress={progress}
                setProgress={setProgress}
                users={users}
              />
            )
        }
      </div>
    </div>
  );
};

export default NewEngagement;
