import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUndefined } from 'lodash';
import { RiUserReceivedLine } from 'react-icons/all';
import FormBuilder from '../../components/form/builders/form';
import userProps from './constants/usersProps';
import { apiOptions } from '../../services/fetch';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import useStoreParams from '../../components/hooks/useStoreParams';
import { projectAction } from '../../redux/actions/projectActions';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useFetchData from '../../components/hooks/useFetchData';
import { makeFullName, notifier, stringDoesNotExist } from '../../utilities/stringOperations';
import { user } from '../../utilities/auth';
import { auditPost } from '../../utilities/dummyData';
import ListMat from '../../components/ui/listMat';

const InviteMember = ({ engagementName, engagementId, cancel }) => {
  /* redux hooks */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.engagement);
  const store2 = useSelector((state) => state.users);
  const usersStore = useStoreParams(store2.users);

  /* router hooks */
  const { push } = useHistory();

  /* state */
  const [formData, setFormData] = useState({});
  const [invitees, setInvitees] = useState([]);
  const [errors, setErrors] = useState({});

  /* boilerPlate hooks params */
  const options = {
    action: 'INVITE_TO_ENGAGEMENT',
    apiOpts: apiOptions({
      body: { team_members: invitees },
      endpoint: 'ENGAGEMENT',
      param: engagementId,
      afterParam: 'send-invite',
      auth: true,
      method: 'post'
    })
  };

  /* boilerPlate hooks */
  const {
    handleBlur, handleChange, status, handleChecked, create, data
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store: store.inviteMember,
    action: 'INVITE_TO_ENGAGEMENT_COMPLETE'
  });

  /* custom hooks params */
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
  const updateStore = () => pushUpdates([{
    data: usersStore?.data,
    action: 'USERS_COMPLETE'
  }], dispatch);
  const usersFail = () => {
    setErrors(usersStore?.backErrors);
    updateStore();
  };
  const usersSuccess = () => {
    const usersData = usersStore.data?.users.map((item) => ({
      name: makeFullName([item.first_name, item.last_name]),
      id: item.id
    }));
    setFormData({
      ...formData,
      users: ['Select Members', ...usersData]
    });
    // updateStore();
  };
  const userEmptyState = (items) => items.length < 2;

  /* custom hooks */
  const pushUpdates = useUpdateStore;
  const fetchData = useFetchData;
  fetchData({
    initialCallback: pullUsers,
    push,
    dataIndex: 'users',
    successCallback: usersSuccess,
    emptyRedirect: '/app/team/invite-user',
    emptyMsg: 'Your are alone, Invite team members to your workspace.',
    failCallback: usersFail,
    emptyState: userEmptyState,
    emptyCallback: updateStore,
    store: usersStore
  });

  /* react hooks */
  useEffect(() => {
    if (
      !stringDoesNotExist(formData.user_id) && !stringDoesNotExist(formData.engagement_team_role_id)
    ) {
      /* add invitees */
      const inviteeName = formData?.users.filter(
        (one) => !isUndefined(one.id) && one.id.toString() === formData.user_id
      );
      const inviteePosition = auditPost?.filter(
        (one) => !isUndefined(one.id) && one.id.toString() === formData.engagement_team_role_id
      );
      const invited = invitees.find((item) => item.name === inviteeName[0]?.name);
      if (isUndefined(invited)) {
        setInvitees(
          [
            ...invitees,
            {
              user_id: formData?.user_id,
              engagement_team_role_id: formData?.engagement_team_role_id,
              name: inviteeName[0]?.name,
              position: inviteePosition[0]?.type
            }
          ]
        );
      } else {
        notifier({
          type: 'info',
          title: 'Duplicate invites',
          text: `${invited.name} already queued for invites`
        });
      }
      /* reset */
      setFormData({
        ...formData,
        user_id: '',
        engagement_team_role_id: ''
      });
    }
  }, [formData?.engagement_team_role_id, formData?.user_id]);

  const listData = invitees.map((item) => ({
    name: `${item.name}, ${item.position}`,
    icon: <RiUserReceivedLine />
  }));

  return (
    <div className="my-3">
      {
        usersStore?.status === 'pending'
          ? (
            <div className="loader">
              <i />
            </div>
          )
          : (
            <div>
              <div className="font-title-small text-theme-black my-4 text-center">
                <span>Invite collaborators to</span>
                <span className="bold mx-2">{engagementName}</span>
                <span>team</span>
              </div>
              <div className="text-center ">
                <div className="font-regular">On the queue</div>
                <ListMat props={listData} clss={{ main: 'row', item: 'font-small simple-hover col-md-6' }} />
              </div>
              <div className="d-flex justify-content-between">
                <FormBuilder
                  formItems={
                    userProps(
                      {
                        formData,
                        handleBlur,
                        handleChange,
                        errors
                      }
                    )
                  }
                />
              </div>
              <div className="d-flex justify-content-between">
                <div><button className="btn-plain border-bottom theme-hover" type="button" onClick={cancel}>Cancel</button></div>
                <div><button disabled={invitees?.length < 1} className="btn" type="button" onClick={create}>{`Send Invites ${invitees.length > 0 ? `(${invitees.length})` : ''}`}</button></div>
              </div>
            </div>
          )
      }
    </div>
  );
};
export default InviteMember;
