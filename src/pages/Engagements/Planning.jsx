import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useHistory, useParams } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { makeFullName, notifier, sentenceCaps } from '../../utilities/stringOperations';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useStoreParams from '../../components/hooks/useStoreParams';
import { apiOptions } from '../../services/fetch';
import { projectAction } from '../../redux/actions/projectActions';
import PlanningTemp from './temps/planning/PlanningTemp';
import { user } from '../../utilities/auth';
import Notes from './Notes';
import EngagementStep from './temps/engagementStep';

const Planning = () => {
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
  const store2 = useSelector((state) => state.users);
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
  const pushUpdatesArr = [
    {
      data: store?.engagements?.data?.data,
      action: 'ENGAGEMENTS_COMPLETE'
    }
  ];
  const {
    handleBlur, handleChange, status, handleChecked, create, data, message
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
    action: 'PLANNING_COMPLETE'
    // redirect: '/app/engagements'
  });
  const uploadsStore = useStoreParams(store.uploads);
  const userStore = useStoreParams(store2?.users);
  const inviteStore = useStoreParams(store?.inviteUser);
  const pushUpdates = useUpdateStore;
  const sendInvite = React.useCallback((userInvite) => {
    dispatch(projectAction(
      {
        action: 'INVITE_TO_ENGAGEMENT',
        routeOptions: apiOptions({
          endpoint: 'ENGAGEMENT',
          param: id,
          afterParam: 'send-invite',
          body: {
            user_id: userInvite.user_id,
            company_id: user?.company_id
          },
          auth: true,
          method: 'post'
        })
      }
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        text: uploadsStore.message || 'failed to upload file',
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
    if (userStore?.status === 'initial') {
      pullUsers();
    }
    if (userStore?.status === 'failed') {
      notifier({
        title: 'Connection Failed',
        text: userStore?.message || 'Failed to pull your Partners. Please retry',
        type: 'error'
      });
      setErrors(userStore?.backErrors);
      pushUpdates([{
        data: userStore?.data,
        action: 'USERS_COMPLETE'
      }], dispatch);
    }
    if (userStore?.status === 'success') {
      if (!isEmpty(userStore.data.users)) {
        const usersData = userStore.data?.users.map((item) => ({
          name: makeFullName([item.first_name, item.last_name]),
          id: item.id
        }));
        setFormData({
          ...formData,
          users: [...users, ...usersData]
        });
      }
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore?.status]);
  React.useEffect(() => {
    if (formData?.user_id > 0) {
      sendInvite(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.user_id]);
  React.useEffect(() => {
    if (inviteStore?.status === 'success') {
      notifier({
        title: inviteStore.status,
        text: inviteStore?.message || 'Invite sent',
        type: inviteStore.status
      });
      pushUpdates([{
        data: inviteStore?.data,
        action: 'INVITE_TO_ENGAGEMENT_COMPLETE'
      }], dispatch);
    }
    if (inviteStore?.status === 'failed') {
      notifier({
        title: inviteStore.status,
        text: inviteStore?.message || 'Invite not sent',
        type: 'error'
      });
      pushUpdates([{
        data: inviteStore?.data,
        action: 'INVITE_TO_ENGAGEMENT_COMPLETE'
      }], dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteStore.status]);

  return (
    <div className="row">
      <div className="col-md-10">
        <div className="d-flex ml-4 custom-top-bar justify-content-between">
          <div className="">
            <span className="theme-font-bold font-title-small text-theme-black mr-1">{sentenceCaps(engagementName)}</span>
            <span className="mr-1">{`- ${year}`}</span>
          </div>
          <div>
            <Link to="/app/engagement/" className="text-theme-blue mr-1">Engagements</Link>
            <span className="text-theme-black">/ Engagement</span>
          </div>
        </div>
        <div className="content">
          <div className="mb-4 font-title-small">
            Select engagement step to continue
          </div>
          <div className="my-4 row">
            <EngagementStep />
          </div>
          {
            status === 'pending' || userStore.status === 'pending'
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
                />
              )
          }
        </div>
      </div>
      <div className="col-md-2 bg-white min-h-100">
        <Notes />
      </div>
    </div>
  );
};

export default Planning;
