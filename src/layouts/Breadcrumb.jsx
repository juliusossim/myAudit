/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const CollapsedBreadcrumbs = ({ linksArr }) => (
  <Breadcrumbs maxItems={2} aria-label="breadcrumb">
    <Link to="/">
      Home
    </Link>
    <Typography color="textPrimary">Belts</Typography>
  </Breadcrumbs>
);

export default CollapsedBreadcrumbs;
