import React from 'react';
import { Helmet } from 'react-helmet';

import urls from 'urlData';

const HelmetContent = ({
  page,
}) => (
  <Helmet>
    <title>{urls[page].title}</title>
    <meta name="description" content={urls[page].desc} />
    <meta property="og:title" content={urls[page].title} />
    <meta property="og:description" content={urls[page].desc} />
    <meta property="og:image" content={urls[page].img} />
  </Helmet>
);

export default HelmetContent;
