import React from 'react';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { BiDonateHeart, FiShare2 } from 'react-icons/all';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import { approvalColors, approvalStatus } from '../../utilities/dummyData';
import { stringCaps, stringDoesNotExist } from '../../utilities/stringOperations';
import { positiveDiffs } from '../../utilities/dateOperations';
import User from '../../assets/images/User.svg';
import Kat from '../../assets/images/kat-yukawa-K0E6E0a0R3A-unsplash 1.svg';

const ProjectInfo = ({
  project, styled, logo, actions, chip, shares, clss
}) => (
  <div className="">
    <Paper elevation={3} className={clss || 'h-52h'}>
      <div className="mt-1">
        <CardContent>
          <div className="">
            <div className={logo ? 'd-none' : ''}>
              <CardMedia
                className="h-18h"
                image={_.head(project?.media)?.uri || Kat}
                title={project.title}
              />
            </div>
            <div className="my-1 px-2">
              <Link to={{ pathname: `/project/details/${project.id}/1`, tab: 1, id: project.id }}>
                <span className="h5 bold">{project?.title}</span>
                <Chip
                  className={chip ? '' : 'd-none'}
                  color={
                    approvalColors[approvalStatus[project?.approvalStatus]]
                  }
                  label={stringCaps(approvalStatus[project?.approvalStatus])}
                />
                <div className={logo ? 'd-none' : ''}>
                  <p>
                    <small>
                      <span className="px-1">
                        {`${stringDoesNotExist(project.lga) ? 'Abuja' : stringCaps(project.lga)},`}
                      </span>
                      <span>
                        {stringDoesNotExist(project.city) ? 'Nigeria' : stringCaps(project.state)}
                      </span>
                    </small>
                  </p>
                </div>
              </Link>
            </div>

            <div className={logo ? 'd-flex' : 'd-none'}>
              <Avatar src={User} alt="profile logo" />
              <div className="pl-1">
                <p>
                  <small>Posted By:</small>
                  {' '}
                  {project.creator?.fullName}
                </p>
                <p>
                  <small>
                    2 Projects |
                    <span className="px-1">
                      {`${stringDoesNotExist(project.lga) ? 'Abuja' : stringCaps(project.lga)},`}
                    </span>
                    <span>
                      {stringDoesNotExist(project.city) ? 'Nigeria' : stringCaps(project.state)}
                    </span>
                  </small>
                </p>
              </div>
            </div>

            <div className="my-1 px-2">
              <p>
                {project.summary}
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
            <div className="d-flex mt-2 mb-2">
              <div className="pr-1 raised">
                <span className="bold mr-1">
                  <span>&#8358;</span>
                  {project?.amountRaised?.toLocaleString() || 0}
                </span>
                raised
              </div>
              <div className={styled ? 'pl-1' : 'pl-5'}>
                <span>{styled ? 'of' : 'Target'}</span>
                <span className="bold pl-1">
                  <span>&#8358;</span>
                  {project?.donationTarget?.toLocaleString() || 0}
                </span>
              </div>
            </div>
            <div className="progress mt-1 mb-3" title={`#${(project?.donationTarget - project?.amountRaised).toLocaleString()} to hit target`}>
              <div
                className="progress-bar bg-wema"
                role="progressbar"
                aria-valuenow={
                  (project?.amountRaised / project?.donationTarget) * 100
                }
                style={{ width: `${(project?.amountRaised / project?.donationTarget) * 100}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-labelledby="progress_bar"
              />
            </div>
            <div className="d-flex mt-1">
              {styled && (
                <div>
                  <p>
                    <small>Posted By:</small>
                  </p>
                  <p>
                    {project.creator?.fullName}
                  </p>
                </div>
              )}
              <div className={styled ? 'pl-5' : ''}>
                <small className={styled ? 'd-block' : ''}>Fund Percent:</small>
                <span className="bold ml-2 text-center">
                  {
                    typeof ((project?.amountRaised / project?.donationTarget) * 100)
                      .toFixed(0) === 'number'
                      ? (
                        <span>
                          {
                            ((project?.amountRaised / project?.donationTarget) * 100)
                              .toFixed(0)
                          }
                        </span>
                      )
                      : (
                        <span>
                          0
                        </span>
                      )
                  }
                  %
                </span>
              </div>
              <div className="pl-5">
                <small className={styled ? 'd-block' : ''}>Duration:</small>
                {
                  `Due ${positiveDiffs(new Date(project?.endDate))}`
                }
              </div>
            </div>
          </div>
          <div className={actions !== undefined ? 'd-flex mt-5' : 'd-none'}>
            {
              actions !== undefined
              && actions.map((action) => (action.plain
                ? <button onClick={action.onClick} type="button" className="btn-plain w-50 border-wema hover-wema">{stringCaps(action.text)}</button>
                : <button onClick={action.onClick} type="button" className="btn w-50 mr-2">{stringCaps(action.text)}</button>))
            }
          </div>
        </CardContent>
      </div>
    </Paper>
  </div>
);
export default ProjectInfo;
