import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import { sentenceCaps } from '../../utilities/stringOperations';
import { apiOptions } from '../../services/fetch';
import Notes from './Notes';
import EngagementStep from './temps/engagementStep';
import MembersTable from '../../components/tables/membersTable';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import NoData from '../authentication/NoData';
import BackdropModal from '../../components/microComponents/backdropModal';
import InviteMember from './inviteMember';

const Engagement = () => {
  /* redux hooks */
  const store = useSelector((state) => state.engagement?.engagement);

  /* router hooks */
  const { engagementId } = useParams();

  /* state */
  const [formData, setFormData] = useState({ });
  const [open, setOpen] = useState(false);

  /* boilerPlate hooks params */
  const options = {
    action: 'ENGAGEMENT',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENT',
      auth: true,
      param: engagementId,
      method: 'get'
    })
  };

  /* boilerPlate hooks */
  const {
    status
  } = useViewBoilerPlate({
    setFormData,
    formData,
    store,
    options
  });

  return (
    <div className="row">
      <div className="col-md-10">
        <div className="d-flex ml-4 custom-top-bar justify-content-between">
          <div className="">
            <span className="theme-font-bold font-title-small text-theme-black mr-1">{sentenceCaps(formData?.engagement?.name)}</span>
            <span className="mr-1">{`- ${formData?.engagement?.year}`}</span>
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
            <EngagementStep engagementId={engagementId} />
          </div>
          {
            status === 'pending'
              ? <Loader />
              : (
                <div>
                  {
                    isEmpty(formData?.teamMembers)
                      ? (
                        <NoData
                          title={`No ${formData?.engagement?.name} team`}
                          text="Invite collaborators to this engagement"
                          btnName="Invite Members"
                          callback={() => setOpen(true)}
                        />
                      )
                      : <MembersTable data={formData.teamMembers} />
                  }
                </div>
              )
          }
        </div>
      </div>
      <div className="col-md-2 bg-white min-h-100">
        <Notes engagementId={engagementId} />
      </div>
      <BackdropModal
        handleClose={() => setOpen(false)}
        open={open}
        content={(
          <InviteMember
            engagementId={engagementId}
            engagementName={formData?.engagement?.name}
            cancel={() => setOpen(false)}
          />
        )}
      />
    </div>
  );
};

export default Engagement;
