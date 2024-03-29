import React from 'react';
import _ from 'lodash';
import Zoom from 'react-reveal/Zoom';

import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { BiDonateHeart, FiShare2 } from 'react-icons/all';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import { approvalColors, approvalStatus } from '../../utilities/dummyData';
import {
  percentCalculator, sentenceCaps, stringCaps, stringDoesNotExist
} from '../../utilities/stringOperations';
import { positiveDiffs } from '../../utilities/dateOperations';
import User from '../../assets/images/User.svg';
import Kat from '../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg';
import BackdropModal from '../microComponents/backdropModal';
import ShareTemp from '../temps/modalTemps/share';
import ProjectProgress from '../temps/projectTemps/projectProgress';

const ProjectInfo = ({
  project, styled, logo, actions, chip, shares, clss, history
}) => {
  const [open, setOpen] = React.useState(false);
  const user = { ...JSON.parse(localStorage.getItem('user')) };

  const naira = process.env.REACT_APP_NAIRA;
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Paper elevation={3} className={clss || 'h-52h post overflow-y-hidden px-md-0 px-3'}>
      <Link to={`/project/details/${project?.id}/1`}>
        <div className={logo ? 'd-none' : ''}>
          <Zoom>
            <CardMedia
              className="h-18h post"
              image={_.head(project?.media)?.uri || project?.primaryMedia?.uri || Kat}
              title={project?.title}
            />
          </Zoom>
        </div>
      </Link>
      <CardContent>
        <div>
          <Link to={history ? '#' : `/project/details/${project?.id}/1`} onClick={() => history && history.replace(`/project/details/${project?.id}/1`)}>

            <div className="post-title">
              <div className="my-1">
                <div>
                  <span className="h5 bold">{project?.title}</span>
                  <Chip
                    className={chip ? '' : 'd-none'}
                    color={
                      approvalColors[approvalStatus[project?.approvalStatus]]
                    }
                    label={stringCaps(approvalStatus[project?.approvalStatus])}
                  />
                  <div className={logo ? 'd-none' : ''}>
                    <p className="text-muted theme-font-2">
                      <small>
                        <span className="">
                          {stringDoesNotExist(project?.lga?.name) ? '' : `${stringCaps(project?.lga?.name)},`}
                        </span>
                        <span>
                          {stringDoesNotExist(project?.state) ? '' : stringCaps(project?.state)}
                        </span>
                      </small>
                    </p>
                  </div>
                </div>
              </div>

              <div className={logo ? 'd-flex' : 'd-none'}>
                <Avatar src={user?.profile_pic_url || User} alt="profile logo" />
                <div className="ml-2">
                  <p className="text-muted theme-font-2">
                    <small>Posted By:</small>
                    {' '}
                    <small className="bold">{project?.creator?.fullName}</small>
                  </p>
                  <p>
                    <small className="text-muted theme-font-2">
                      <span className="mr-1">{project?.totalProjects > 1 ? `${project?.totalProjects} projects |` : `${project?.totalProjects} project |`}</span>
                      <span className="mr-1">
                        {stringDoesNotExist(project?.lga?.name) ? '' : `${stringCaps(project?.lga?.name)},`}
                      </span>
                      <span>
                        {stringDoesNotExist(project?.state) ? '' : stringCaps(project?.state)}
                      </span>
                    </small>
                  </p>
                </div>
              </div>

              <div className="my-1  theme-font-2 font-14 h-50-m">
                <p>
                  {project?.summary}
                </p>
              </div>
              <div className={shares ? 'col-md-5 my-3' : 'd-none'}>
                <div className="d-flex">
                  <div className="mr-5">
                    <div className="d-flex">
                      <h6 className="text-wema pr-1">
                        <BiDonateHeart />
                      </h6>
                      <p>
                        Donors
                      </p>
                    </div>
                    <p className="bold">{project?.donors || 'None'}</p>
                  </div>
                  <div>
                    <div className="d-flex">
                      <h6 className="text-wema pr-1">
                        <FiShare2 />
                      </h6>
                      <p>
                        Shares
                      </p>
                    </div>
                    <p className="bold">{project?.shares || 0}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex mt-2 mb-2 font-12">
                <div className="pr-1 theme-font-2 font-12">
                  <span className="bold mr-1">
                    <span>&#8358;</span>
                    {project?.amountRaised?.toLocaleString() || 0}
                  </span>
                  raised
                </div>
                <div className={styled ? 'pl-1 font-12' : 'pl-5 font-12'}>
                  <span>{styled ? 'of' : 'Target'}</span>
                  <span className="bold pl-1">
                    <span>&#8358;</span>
                    {project?.donationTarget?.toLocaleString() || 0}
                  </span>
                </div>
              </div>
              <ProjectProgress project={project} />
              {/* <div className="progress mt-1 mb-3" style={{ height: '8px' }}
             title={`#${(project?.donationTarget - project?.amountRaised).toLocaleString()}
             to hit target`}> */}
              {/*  <div */}
              {/*    className="progress-bar bg-wema" */}
              {/*    role="progressbar" */}
              {/*    aria-valuenow={ */}
              {/*      (project?.amountRaised / project?.donationTarget) * 100 */}
              {/*    } */}
              {/*    style={{ width: `${(project?.amountRaised /
            project?.donationTarget) * 100}%` }} */}
              {/*    aria-valuemin="0" */}
              {/*    aria-valuemax="100" */}
              {/*    aria-labelledby="progress_bar" */}
              {/*  /> */}
              {/* </div> */}
              <div className="row mt-1">
                <div className={styled ? 'col-md-4' : 'd-none'}>

                  <small className="font-09 d-block">Posted By:</small>

                  <div className="bold font-10">
                    {sentenceCaps(project?.creator?.fullName) || 'Private User'}
                  </div>
                </div>
                <div className={styled ? 'col-md-3' : 'col-md-5 font-12'}>
                  <small className={styled ? 'd-block font-09' : 'font-12'}>Funded:</small>
                  <div className={styled ? 'bold font-09' : 'bold font-12 pl-2'}>
                    {
                      percentCalculator(
                        { den: project?.donationTarget, num: project?.amountRaised }
                      )
                    }
                  </div>
                </div>
                <div className={styled ? 'col-md-5' : 'col-md-7'}>
                  <small className={styled ? 'd-block font-09' : 'font-12'}>Due Date:</small>
                  <div className={styled ? 'bold font-09' : 'bold font-12 pl-2'}>
                    {
                      positiveDiffs(new Date(project?.endDate))
                    }
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className={actions !== undefined ? 'd-flex mt-5' : 'd-none'}>
            {
              actions !== undefined
           && actions.map((action) => (action.plain
             ? (
               <button
                 onClick={action.onClick || handleOpen}
                 key={action.text}
                 type="button"
                 className="btn-plain w-50 border-wema hover-wema"
               >
                 {stringCaps(action.text) || 'Share'}
               </button>
             )
             : (
               <Link key={action.text} to={{ pathname: `/project/donate/${project?.id}`, project }} className="btn w-50 mr-2">
                 {/* <button */}
                 {/*  // onClick={popup.show} */}
                 {/*  key={action.text} */}
                 {/*  type="button" */}
                 {/*  className="btn w-50 mr-2" */}
                 {/* > */}
                 {stringCaps(action.text) || 'Donate'}
                 {/* </button> */}
               </Link>
             )))
            }
          </div>
          <BackdropModal
            content={<ShareTemp handleClose={handleClose} project={project} />}
            handleClose={handleClose}
            open={open}
          />
        </div>
      </CardContent>
    </Paper>
  );
};
export default ProjectInfo;
