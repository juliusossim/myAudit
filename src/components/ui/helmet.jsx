import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetHead = ({ title, content, name }) => (
  <Helmet>
    <title>{title}</title>
    <meta name={name} content={content} />
  </Helmet>

);
