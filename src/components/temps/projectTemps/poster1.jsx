import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import User from '../../../assets/images/User.svg';
import { stringCaps, stringDoesNotExist } from '../../../utilities/stringOperations';

const Poster1 = ({ project }) => (
  <div className="d-flex">
    <Avatar src={User} alt="profile logo" />
    <div className="pl-1">
      <p className="text-muted theme-font-2">
        <small>Posted By:</small>
        {' '}
        <small className="bold">{project?.creator?.fullName}</small>
      </p>
      <p>
        <small className="text-muted theme-font-2">
          2 Projects |
          <span className="px-1">
            {`${stringDoesNotExist(project?.lga?.name) ? 'Abuja' : stringCaps(project?.lga?.name)},`}
          </span>
          <span>
            {stringDoesNotExist(project?.state) ? 'Nigeria' : stringCaps(project?.state)}
          </span>
        </small>
      </p>
    </div>
  </div>
);
export default Poster1;
