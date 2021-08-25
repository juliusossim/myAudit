/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import _ from 'lodash';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { FcHome } from 'react-icons/all';

const CollapsedBreadcrumbs = ({ prevs, current, max }) => (
  <Breadcrumbs maxItems={max} aria-label="breadcrumb">
    <Link to="/">
      <FcHome />
      Home
    </Link>
    { _.isArray(prevs)
      && prevs?.map((crumb) => (
        <Link key={crumb.name} to={crumb.to} onClick={crumb.onClick}>
          {crumb.name}
        </Link>
      ))}
    <Typography color="textPrimary">{current}</Typography>
  </Breadcrumbs>
);

export default CollapsedBreadcrumbs;
